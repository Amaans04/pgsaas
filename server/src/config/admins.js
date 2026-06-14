/**
 * Admin whitelist — only these emails can access the owner panel per PG.
 * Add emails here manually, then restart the server.
 */
const ADMIN_EMAILS_BY_PG = {
  'sample-pg': [
    'amaansaify64@gmail.com',
  ],
};

export function isAdminEmail(email, sitePgId) {
  if (!email || !sitePgId) return false;
  const list = ADMIN_EMAILS_BY_PG[sitePgId] || [];
  return list.includes(email.toLowerCase());
}

/** True if email is whitelisted for any PG site (used after owner role is assigned). */
export function isWhitelistedAdminEmail(email) {
  if (!email) return false;
  const lower = email.toLowerCase();
  return Object.values(ADMIN_EMAILS_BY_PG).some((list) => list.includes(lower));
}

export { ADMIN_EMAILS_BY_PG };
