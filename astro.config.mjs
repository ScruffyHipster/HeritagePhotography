import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://heritagephotographer.co.uk',
  integrations: [sitemap()],
  output: 'static',
  build: {
    format: 'directory',
  },
});
