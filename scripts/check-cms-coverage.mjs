import assert from 'node:assert/strict';
import { access, readFile, readdir } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const pageRecords = ['home', 'about', 'contact', 'projects', 'gallery', 'events', 'shop', 'not-found'];
const sourceFiles = [
  'src/layouts/BaseLayout.astro',
  'src/components/Header.astro',
  'src/components/Footer.astro',
  'src/components/ImageFrame.astro',
  'src/components/InquiryForm.astro',
  'src/components/ProjectCard.astro',
  'src/lib/enquiry.mjs',
  'src/pages/index.astro',
  'src/pages/about.astro',
  'src/pages/contact.astro',
  'src/pages/events.astro',
  'src/pages/shop.astro',
  'src/pages/404.astro',
  'src/pages/projects/index.astro',
  'src/pages/projects/[slug].astro',
  'src/pages/gallery/index.astro',
  'src/pages/gallery/[slug].astro',
];

for (const page of pageRecords) await access(new URL(`src/content/pages/${page}.md`, root));
await access(new URL('src/content/site.json', root));
await access(new URL('src/content/shared.json', root));

const [cms, templates, allContent] = await Promise.all([
  readFile(new URL('.pages.yml', root), 'utf8'),
  Promise.all(sourceFiles.map((file) => readFile(new URL(file, root), 'utf8'))).then((files) => files.join('\n')),
  Promise.all([
    ...pageRecords.map((page) => readFile(new URL(`src/content/pages/${page}.md`, root), 'utf8')),
    readFile(new URL('src/content/shared.json', root), 'utf8'),
  ]).then((files) => files.join('\n')),
]);

const imageContentDirectories = ['pages', 'projects', 'galleries', 'events', 'products'];
const imageContentFiles = (await Promise.all(imageContentDirectories.map(async (directory) => {
  const files = await readdir(new URL(`src/content/${directory}/`, root));
  return Promise.all(files.filter((file) => /\.mdx?$/.test(file)).map((file) => readFile(new URL(`src/content/${directory}/${file}`, root), 'utf8')));
}))).flat();
const imageSlotCount = imageContentFiles.reduce((count, content) => count + (content.match(/\balt:/g)?.length ?? 0), 0);

for (const page of pageRecords) assert.match(cms, new RegExp(`path: src/content/pages/${page}\\.md`));
assert.match(cms, /path: src\/content\/shared\.json/);
assert.match(cms, /input: public\/media\/images/);
for (const extension of ['jpg', 'jpeg', 'png', 'webp', 'avif']) assert.match(cms, new RegExp(`\\b${extension}\\b`));
assert.ok(imageSlotCount >= 46, `Expected at least 46 CMS image slots, found ${imageSlotCount}`);

const migratedCopy = [
  'Scroll to explore',
  'Photographer and heritage enthusiast, always looking for a new perspective.',
  'Exhibitions and Heritage Open Days.',
  'Exhibition merchandise.',
  'This path has faded from view.',
  'Photography forthcoming',
  'Copy enquiry',
  'Primary navigation',
  'Product enquiry',
  'Website enquiry',
];
for (const text of migratedCopy) {
  assert.match(allContent, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.ok(!templates.includes(text), `Visitor-facing copy remains hard-coded: ${text}`);
}

console.log(`Verified CMS coverage for ${pageRecords.length} fixed pages, ${imageSlotCount} image slots, shared wording and the photo library.`);
