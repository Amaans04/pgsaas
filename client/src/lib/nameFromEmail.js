/** Derive a readable default name from an email local part. */
export function nameFromEmail(email) {
  if (!email || !email.includes('@')) return '';
  const local = email.split('@')[0] || '';
  return local
    .replace(/[._+-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
