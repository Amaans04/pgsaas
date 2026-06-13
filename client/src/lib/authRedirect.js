/**
 * Default post-login route based on role and onboarding state.
 */
function isProfileOnboarded(profile) {
  return profile?.onboarded === true || Boolean(profile?.role);
}

export function getAuthHomePath(profile, pgId) {
  if (!isProfileOnboarded(profile)) {
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
