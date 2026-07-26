import { access, readFile } from 'node:fs/promises';

const root = new URL('../dist/', import.meta.url);
const basePrefix = process.env.GITHUB_ACTIONS === 'true' ? '/HeritagePhotography' : '';
const requiredRoutes = [
  'index.html', 'about/index.html', 'projects/index.html', 'gallery/index.html',
  'events/index.html', 'shop/index.html', 'contact/index.html', '404.html',
  'projects/derelict-doncaster/index.html', 'projects/doncaster-details-quiz/index.html',
  'projects/historic-churches-of-doncaster/index.html', 'projects/good-bad-ugly-exhibition/index.html',
  'gallery/doncaster-detail-quizzes-1-25/index.html', 'gallery/exhibition-photos-good-bad-ugly/index.html',
  'gallery/heritage-open-days-2026-churches/index.html', 'gallery/streets-of-doncaster/index.html',
  'gallery/on-tour/index.html', 'gallery/day-tripping/index.html',
  'sitemap-index.xml',
];

for (const route of requiredRoutes) await access(new URL(route, root));

const broken = [];
for (const file of requiredRoutes.filter((route) => route.endsWith('.html'))) {
  const html = await readFile(new URL(file, root), 'utf8');
  const links = [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((match) => match[1]);
  for (const link of links) {
    if (link.startsWith('/_astro/') || /\.[a-z0-9]+$/i.test(link)) continue;
    const route = basePrefix && link.startsWith(basePrefix)
      ? link.slice(basePrefix.length) || '/'
      : link;
    const relative = route === '/' ? 'index.html' : `${route.replace(/^\/|\/$/g, '')}/index.html`;
    try { await access(new URL(relative, root)); }
    catch { broken.push(`${file} -> ${link}`); }
  }
}

if (broken.length) throw new Error(`Broken internal links:\n${broken.join('\n')}`);
console.log(`Verified ${requiredRoutes.length} generated routes and their internal links.`);
