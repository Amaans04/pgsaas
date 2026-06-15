/**
 * Tenant onboarding is complete when a valid phone exists on their profile.
 * Owners/staff use role-specific rules instead.
 */
export function hasRegisteredPhone(profile) {
  const digits = String(profile?.phone || '').replace(/\D/g, '');
  return digits.length >= 10;
}

export function isProfileOnboarded(profile) {
  if (!profile) return false;

  if (profile.isAdmin || profile.role === 'owner') {
    return profile.needsPasswordSetup !== true;
  }

  if (profile.role === 'staff') {
    return true;
  }

  return hasRegisteredPhone(profile);
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
