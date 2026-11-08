import type { APIRoute } from 'astro';
import { withBase } from '../lib/paths';
import siteSettings from '../content/site.json';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const deploymentSite = site ?? new URL(siteSettings.canonicalUrl);
  const sitemap = new URL(withBase('/sitemap-index.xml'), deploymentSite);

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
