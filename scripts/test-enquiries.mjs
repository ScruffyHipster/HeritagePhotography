import assert from 'node:assert/strict';
import { buildEnquiry, createMailto } from '../src/lib/enquiry.mjs';

const contact = buildEnquiry({
  name: 'Ava O’Brien',
  replyTo: 'ava+heritage@example.com',
  topic: 'Photography commission',
  message: 'St Mary’s & the old mill — autumn 2026?',
});
assert.equal(contact.subject, 'Website enquiry: Photography commission');
assert.match(contact.body, /Ava O’Brien/);
assert.match(contact.body, /St Mary’s & the old mill — autumn 2026\?/);

const order = buildEnquiry({
  name: 'Jo',
  replyTo: 'jo@example.com',
  item: '',
  presentation: 'Framed',
  frame: 'Natural oak',
  quantity: '2',
  message: 'Please quote for delivery to London.',
}, { kind: 'product', product: 'Pugin’s Gem — No. 4' });
assert.equal(order.subject, 'Product enquiry: Pugin’s Gem — No. 4');
assert.match(order.body, /Frame colour: Natural oak/);
assert.match(order.body, /Quantity: 2/);

const mailto = createMailto('heritagephotographer@icloud.com', order);
assert.ok(mailto.startsWith('mailto:heritagephotographer@icloud.com?subject='));
assert.ok(mailto.includes('%E2%80%99'));
assert.ok(mailto.includes('%0A'));
assert.ok(!mailto.includes(' '));

console.log('Verified contact and product enquiry composition, fallbacks, and URL encoding.');
