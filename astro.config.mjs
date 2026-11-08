import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import siteSettings from './src/content/site.json';

export default defineConfig({
  site: process.env.GITHUB_PAGES_ORIGIN || siteSettings.canonicalUrl,
  base: process.env.GITHUB_PAGES_BASE_PATH || '/',
  integrations: [sitemap()],
  output: 'static',
  build: {
    format: 'directory',
  },
});
