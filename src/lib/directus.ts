import { createDirectus, rest, staticToken } from '@directus/sdk';
import { DIRECTUS_TOKEN, DIRECTUS_URL } from 'astro:env/server';

/** Directus REST client. Used only at build time (content loader). */
export const directus = createDirectus(DIRECTUS_URL).with(staticToken(DIRECTUS_TOKEN)).with(rest());

export type AssetTransform = {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  fit?: 'cover' | 'contain' | 'inside' | 'outside';
};

/** Public URL of a Directus file (optionally with server-side transforms). */
export function assetUrl(id: string, transform?: AssetTransform): string {
  const url = new URL(`/assets/${id}`, DIRECTUS_URL);
  for (const [key, value] of Object.entries(transform ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  return url.toString();
}
