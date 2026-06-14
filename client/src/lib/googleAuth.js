import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

const INTENT_KEY = 'googleAuthIntent';

/** Popup locally; redirect in production avoids COOP console warnings from Firebase. */
export async function startGoogleSignIn(intent = 'tenant') {
  if (import.meta.env.PROD) {
    try {
      sessionStorage.setItem(INTENT_KEY, intent);
    } catch {
      // sessionStorage unavailable — redirect may still work via getRedirectResult
    }
    await signInWithRedirect(auth, googleProvider);
    return null;
  }
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

/**
 * Complete a production Google redirect sign-in.
 * Uses sessionStorage intent + auth.currentUser fallback when getRedirectResult is empty.
 */
export async function finishGoogleRedirectSignIn(expectedIntent) {
  let pendingIntent = null;
  try {
    pendingIntent = sessionStorage.getItem(INTENT_KEY);
  } catch {
    pendingIntent = null;
  }

  if (expectedIntent && pendingIntent && pendingIntent !== expectedIntent) {
    return null;
  }

  const result = await getRedirectResult(auth);
  const redirectUser = result?.user ?? null;
  const user =
    redirectUser ||
    (pendingIntent && auth.currentUser ? auth.currentUser : null);

  if (!user) return null;

  try {
    sessionStorage.removeItem(INTENT_KEY);
  } catch {
    // ignore
  }

  return {
    user,
    intent: pendingIntent || expectedIntent || 'tenant',
  };
}
