import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readPage = (route) => readFile(new URL(`../dist/${route}`, import.meta.url), 'utf8');

const [home, projects, galleries, events, shop, contact, site] = await Promise.all([
  readPage('index.html'),
  readPage('projects/index.html'),
  readPage('gallery/index.html'),
  readPage('events/index.html'),
  readPage('shop/index.html'),
  readPage('contact/index.html'),
  readFile(new URL('../src/content/site.json', import.meta.url), 'utf8'),
]);

for (const title of [
  'Derelict Doncaster',
  'Doncaster Details Quiz',
  'Historic Churches of Doncaster',
  'The Good, the Bad and the Ugly Exhibition',
]) {
  assert.match(projects, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}

for (const title of [
  'Doncaster Detail Quizzes 1–25',
  'Exhibition Photos: The Good, the Bad and the Ugly',
  'Heritage Open Days 2026: Churches',
  'Streets of Doncaster',
  'On Tour',
  'Day Tripping',
]) {
  assert.match(galleries, new RegExp(title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}

assert.match(events, /11–20 September 2026/);
assert.match(events, /17–31 May 2026/);
assert.match(events, /Dates TBC/);
assert.match(events, /Doncaster Brewery and Tap/);
assert.ok(events.indexOf('<h3>Heritage Open Days</h3>') < events.indexOf('<h2>Past events.<\/h2>'));
assert.ok(events.indexOf('<h3>The Good, the Bad and the Ugly Exhibition</h3>') > events.indexOf('<h2>Past events.<\/h2>'));

assert.match(shop, /£5 unframed \/ £10 framed/);
assert.match(shop, /£15/);
assert.match(shop, />Black</);
assert.match(shop, />White</);
assert.doesNotMatch(shop, /Natural oak|museum-grade|archival|limited-edition/i);

assert.match(home, /Historic buildings through a different lens/);
assert.match(contact, /specific historic building in Doncaster/);
assert.match(site, /facebook\.com\/profile\.php\?id=61586411768719/);

const combined = `${home}${projects}${galleries}${events}${shop}${contact}`;
assert.doesNotMatch(combined, /Pugin’s Gem|The Gothic Revival|Sacred Spaces|Industrial Legacy/);

console.log('Verified Canva-authored projects, galleries, events, prices, contact details, and removed unsupported claims.');
