import { getAuthHomePath } from './authRedirect';

const PROFILE_RETRY_DELAYS_MS = [0, 300, 800];

/**
 * Load the app profile after Firebase sign-in. Retries handle session/profile races
 * (onAuthStateChanged vs explicit login, register write propagation).
 */
export async function loadProfileWithRetry(refreshProfile, { forceFirst = true } = {}) {
  let last = null;
  for (let i = 0; i < PROFILE_RETRY_DELAYS_MS.length; i += 1) {
    const delay = PROFILE_RETRY_DELAYS_MS[i];
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    last = await refreshProfile({ force: forceFirst && i === 0 });
    if (last) return last;
  }
  return last;
}

/**
 * Exchange Firebase session for app JWT, load profile, and navigate home.
 * Optional registerProfile is used when signup already created the Firestore doc.
 */
export async function completeTenantSignIn({
  refreshProfile,
  patchProfile,
  pgId,
  navigate,
  registerProfile = null,
}) {
  if (registerProfile) {
    patchProfile(registerProfile);
  }

  const profile = (await loadProfileWithRetry(refreshProfile)) || registerProfile;
  navigate(getAuthHomePath(profile, pgId), { replace: true });
  return profile;
}
