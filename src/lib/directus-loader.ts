import { readFieldsByCollection, readFiles, readItems, readSingleton } from '@directus/sdk';
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';
import { assetUrl, directus } from './directus';

/** Fields requested for every file relation. */
const FILE_FIELDS = ['id', 'type', 'width', 'height', 'filename_download'] as const;

/** Any Directus file (pdf, video, ...). */
export const fileSchema = z.object({
  id: z.string(),
  url: z.string(),
  type: z.string(),
  filename: z.string(),
  width: z.number().nullable(),
  height: z.number().nullable(),
});

/** Image file — width/height are always known, so it can go straight into <Image>. */
export const imageSchema = fileSchema.extend({
  width: z.number(),
  height: z.number(),
});

export type DirectusFile = z.infer<typeof fileSchema>;
export type DirectusImage = z.infer<typeof imageSchema>;

/** Id used for singleton entries: `getEntry('global', SINGLETON_ID)`. */
export const SINGLETON_ID = 'main';

type Query = {
  filter?: Record<string, unknown>;
  sort?: string[];
  limit?: number;
};

type Options = {
  collection: string;
  singleton?: boolean;
  query?: Query;
};

type RawFile = { id: string; type: string; width: number | null; height: number | null; filename_download: string };

function toFile(raw: RawFile): DirectusFile {
  return {
    id: raw.id,
    url: assetUrl(raw.id),
    type: raw.type,
    filename: raw.filename_download,
    width: raw.width,
    height: raw.height,
  };
}

/**
 * Astro Content Layer loader for a Directus collection.
 * - file relations are expanded to `{ id, url, width, height, ... }`
 * - other m2o relations stay as ids (use `reference()` in the schema)
 * - entry id = Directus primary key, or `SINGLETON_ID` for singletons
 */
export function directusLoader({ collection, singleton = false, query = {} }: Options): Loader {
  return {
    name: `directus:${collection}`,
    load: async ({ store, parseData, generateDigest, logger }) => {
      const fields = await directus.request(readFieldsByCollection(collection));
      const isFile = (f: { meta?: { special?: string[] | null } | null }) => f.meta?.special?.includes('file');
      const fileFields = fields.filter(isFile).map((f) => f.field);
      const relationFields = fields.filter((f) => f.meta?.special?.includes('m2o')).map((f) => f.field);
      const booleanFields = fields.filter((f) => f.type === 'boolean').map((f) => f.field);
      // JSON "list" fields whose items contain file ids: { listField: [subField, ...] }
      const listFileFields = new Map<string, string[]>();
      for (const f of fields) {
        const sub = (f.meta?.options as { fields?: { field: string; meta?: { special?: string[] } }[] } | null)?.fields;
        if (f.meta?.interface !== 'list' || !sub) continue;
        const subFiles = sub.filter(isFile).map((s) => s.field);
        if (subFiles.length) listFileFields.set(f.field, subFiles);
      }
      const fieldQuery = ['*', ...fileFields.map((f) => ({ [f]: [...FILE_FIELDS] }))];

      const items: Record<string, unknown>[] = singleton
        ? [await directus.request(readSingleton(collection as never, { fields: fieldQuery as never }))]
        : await directus.request(
            readItems(collection as never, { fields: fieldQuery as never, limit: -1, ...query } as never),
          );

      // Resolve file ids embedded in JSON lists with one extra request.
      const embeddedIds = new Set<string>();
      for (const item of items) {
        for (const [listField, subFields] of listFileFields) {
          for (const row of (item[listField] as Record<string, unknown>[] | null) ?? []) {
            for (const sf of subFields) if (typeof row[sf] === 'string') embeddedIds.add(row[sf] as string);
          }
        }
      }
      const embeddedFiles = new Map<string, DirectusFile>();
      if (embeddedIds.size) {
        const files = await directus.request(
          readFiles({ filter: { id: { _in: [...embeddedIds] } }, fields: [...FILE_FIELDS], limit: -1 }),
        );
        for (const f of files as RawFile[]) embeddedFiles.set(f.id, toFile(f));
      }

      store.clear();
      let stored = 0;

      for (const item of items) {
        const raw: Record<string, unknown> = { ...item };
        for (const f of fileFields) {
          const value = raw[f] as RawFile | null;
          raw[f] = value ? toFile(value) : null;
        }
        for (const [listField, subFields] of listFileFields) {
          const rows = raw[listField] as Record<string, unknown>[] | null;
          if (!rows) continue;
          raw[listField] = rows.map((row) => {
            const next = { ...row };
            for (const sf of subFields) {
              if (typeof next[sf] === 'string') next[sf] = embeddedFiles.get(next[sf] as string) ?? null;
            }
            return next;
          });
        }
        // Content-collection references are always string ids.
        for (const f of relationFields) {
          if (raw[f] != null) raw[f] = String(raw[f]);
        }
        // SQLite stores booleans as 0/1.
        for (const f of booleanFields) {
          if (raw[f] != null) raw[f] = Boolean(raw[f]);
        }

        const id = singleton ? SINGLETON_ID : String(raw.id);
        try {
          const data = await parseData({ id, data: raw });
          store.set({ id, data, digest: generateDigest(raw) });
          stored++;
        } catch (error) {
          // Singletons must be complete. Regular entries that fail validation
          // (e.g. stubs with empty required fields) are not published.
          if (singleton) throw error;
          const label = String(raw.slug ?? raw.key ?? raw.name ?? raw.title ?? id);
          const missing = [...new Set([...(error as Error).message.matchAll(/^\s*\*\*([\w.]+)\*\*/gm)].map((m) => m[1]))];
          logger.warn(`${collection}/${label} skipped — invalid: ${missing.join(', ')}`);
        }
      }

      logger.info(`${collection}: ${stored}/${items.length} ${singleton ? 'singleton' : 'entries'}`);
    },
  };
}
