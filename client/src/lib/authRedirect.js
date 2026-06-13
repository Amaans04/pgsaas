/**
 * Default post-login route based on role and onboarding state.
 */
export function getAuthHomePath(profile, pgId) {
  if (!profile?.onboarded) {
    return `/${pgId}/onboarding`;
  }
  if (profile?.isAdmin) {
    return `/${pgId}/owner/dashboard`;
  }
  if (profile?.role === 'staff') {
    return `/${pgId}/staff/dashboard`;
  }
  return `/${pgId}/tenant/portal`;
}
