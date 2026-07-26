import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: isGitHubPages
    ? 'https://scruffyhipster.github.io'
    : 'https://heritagephotographer.co.uk',
  base: isGitHubPages ? '/HeritagePhotography' : '/',
  integrations: [sitemap()],
  output: 'static',
  build: {
    format: 'directory',
  },
});
