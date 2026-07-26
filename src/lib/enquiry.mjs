export function buildEnquiry(values, { kind = 'contact', product = '' } = {}) {
  const value = (key) => String(values[key] ?? '').trim();
  const isProduct = kind === 'product';
  const subject = isProduct
    ? `Product enquiry: ${value('item') || product}`
    : `Website enquiry: ${value('topic') || 'Photography'}`;
  const lines = [
    `Name: ${value('name')}`,
    `Reply-to: ${value('replyTo')}`,
    isProduct ? `Item: ${value('item') || product}` : `Interest: ${value('topic')}`,
    ...(isProduct ? [
      `Presentation: ${value('presentation')}`,
      `Frame colour: ${value('frame')}`,
      `Quantity: ${value('quantity')}`,
    ] : []),
    '',
    value('message'),
  ];
  return { subject, body: lines.join('\n') };
}

export function createMailto(email, enquiry) {
  return `mailto:${email}?subject=${encodeURIComponent(enquiry.subject)}&body=${encodeURIComponent(enquiry.body)}`;
}
