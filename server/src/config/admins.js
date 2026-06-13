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

export { ADMIN_EMAILS_BY_PG };
