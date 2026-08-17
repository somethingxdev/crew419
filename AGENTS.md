## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Content (Directus)

All page content comes from Directus (`DIRECTUS_URL` / `DIRECTUS_TOKEN` in `.env`) through Astro content collections:

- `src/lib/directus-loader.ts` — Content Layer loader (`directusLoader`), file fields → `{ id, url, width, height, type, filename }`
- `src/content/directus.schema.ts` — **generated** zod schemas: run `pnpm directus:schema` after changing fields in Directus
- `src/content.config.ts` — one collection per Directus collection (filters/sort live here)
- `getSingleton('website_content' | 'global' | …)` from `src/lib/content.ts`; lists via `getCollection` / `getEntry`
- Images: `<CmsImage image={…} alt="…" widths={[…]} />` (`src/components/base/CmsImage.astro`)

Rules: no fallbacks or default values for content — required fields are non-null by type; nullable fields render conditionally.
List entries that fail validation are skipped with a `[WARN] … skipped` line at sync/build time; singletons must be complete.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
