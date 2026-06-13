import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

/** Popup locally; redirect in production avoids COOP console warnings from Firebase. */
export async function startGoogleSignIn() {
  if (import.meta.env.PROD) {
    await signInWithRedirect(auth, googleProvider);
    return null;
  }
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function finishGoogleRedirectSignIn() {
  const result = await getRedirectResult(auth);
  return result?.user ?? null;
}
