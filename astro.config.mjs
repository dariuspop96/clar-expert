import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://clar-expert.com',
  adapter: cloudflare({ imageService: 'compile' }),
  output: 'static', // paginile sunt prerendate; doar /api/* rulează pe edge
  i18n: {
    defaultLocale: 'ro',
    locales: ['ro', 'en', 'fr'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ro',
        locales: { ro: 'ro-RO', en: 'en-US', fr: 'fr-FR' },
      },
    }),
  ],
});
