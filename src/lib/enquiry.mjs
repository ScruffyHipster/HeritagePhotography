/**
 * @typedef {object} EmailCopy
 * @property {string} productSubjectPrefix
 * @property {string} contactSubjectPrefix
 * @property {string} contactSubjectFallback
 * @property {string} nameLabel
 * @property {string} replyToLabel
 * @property {string} itemLabel
 * @property {string} interestLabel
 * @property {string} presentationLabel
 * @property {string} frameLabel
 * @property {string} quantityLabel
 */

/**
 * @param {Record<string, unknown>} values
 * @param {{ kind?: string, product?: string, copy?: EmailCopy }} options
 */
export function buildEnquiry(values, { kind = 'contact', product = '', copy } = {}) {
  if (!copy) throw new Error('Email wording is required.');
  const value = (key) => String(values[key] ?? '').trim();
  const isProduct = kind === 'product';
  const subject = isProduct
    ? `${copy.productSubjectPrefix}: ${value('item') || product}`
    : `${copy.contactSubjectPrefix}: ${value('topic') || copy.contactSubjectFallback}`;
  const lines = [
    `${copy.nameLabel}: ${value('name')}`,
    `${copy.replyToLabel}: ${value('replyTo')}`,
    isProduct ? `${copy.itemLabel}: ${value('item') || product}` : `${copy.interestLabel}: ${value('topic')}`,
    ...(isProduct ? [
      `${copy.presentationLabel}: ${value('presentation')}`,
      `${copy.frameLabel}: ${value('frame')}`,
      `${copy.quantityLabel}: ${value('quantity')}`,
    ] : []),
    '',
    value('message'),
  ];
  return { subject, body: lines.join('\n') };
}

export function createMailto(email, enquiry) {
  return `mailto:${email}?subject=${encodeURIComponent(enquiry.subject)}&body=${encodeURIComponent(enquiry.body)}`;
}
