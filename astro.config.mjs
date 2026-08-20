import tailwindcss from '@tailwindcss/vite';
// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Used to build absolute canonical URLs.
  site: 'https://crew419.com',
  env: {
    schema: {
      DIRECTUS_URL: envField.string({ context: 'server', access: 'public', url: true }),
      DIRECTUS_TOKEN: envField.string({ context: 'server', access: 'secret' }),
    },
  },
  image: {
    remotePatterns: [{ protocol: 'https' }],
  },
  fonts: [
    {
      name: 'Arvo',
      cssVariable: '--font-arvo',
      provider: fontProviders.google(),
      weights: [400, 700],
      styles: ['normal', 'italic'],
      fallbacks: ['serif'],
    },
    {
      name: 'Sadi Sans',
      cssVariable: '--font-sadi-sans',
      provider: fontProviders.local(),
      formats: ['woff2'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/SadiSans-Regular.woff2'],
            weight: 400,
            style: 'normal',
          },
          {
            src: ['./src/assets/fonts/SadiSans-Heavy.woff2'],
            weight: 900,
            style: 'normal',
          },
        ],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
