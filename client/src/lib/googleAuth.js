import { signInWithPopup, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

const INTENT_KEY = 'googleAuthIntent';

/** Resolve the one pending Google redirect result (must only be consumed once). */
let redirectResultPromise = null;

function getRedirectResultOnce() {
  if (!redirectResultPromise) {
    redirectResultPromise = getRedirectResult(auth).catch((err) => {
      redirectResultPromise = null;
      throw err;
    });
  }
  return redirectResultPromise;
}

function storeAuthIntent(intent) {
  try {
    sessionStorage.setItem(INTENT_KEY, intent);
  } catch {
    // ignore
  }
  try {
    localStorage.setItem(INTENT_KEY, intent);
  } catch {
    // ignore
  }
}

function readAuthIntent() {
  try {
    return sessionStorage.getItem(INTENT_KEY) || localStorage.getItem(INTENT_KEY);
  } catch {
    return null;
  }
}

function clearAuthIntent() {
  try {
    sessionStorage.removeItem(INTENT_KEY);
  } catch {
    // ignore
  }
  try {
    localStorage.removeItem(INTENT_KEY);
  } catch {
    // ignore
  }
}

/**
 * Call once at app boot so redirect sign-in completes before profile fetches race it.
 */
export async function resolveGoogleRedirectOnBoot() {
  try {
    return await getRedirectResultOnce();
  } catch {
    return null;
  }
}

/**
 * Admin uses popup everywhere (matches localhost). Tenant uses redirect in production.
 * vercel.json sets COOP to same-origin-allow-popups so admin popup works on Vercel.
 */
export async function startGoogleSignIn(intent = 'tenant') {
  const usePopup = intent === 'admin' || !import.meta.env.PROD;

  if (!usePopup) {
    storeAuthIntent(intent);
    await signInWithRedirect(auth, googleProvider);
    return null;
  }

  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
}

export async function finishGoogleRedirectSignIn(expectedIntent) {
  const pendingIntent = readAuthIntent();

  if (expectedIntent && pendingIntent && pendingIntent !== expectedIntent) {
    return null;
  }

  const result = await getRedirectResultOnce();
  const redirectUser = result?.user ?? null;
  const user =
    redirectUser ||
    (pendingIntent === expectedIntent && auth.currentUser ? auth.currentUser : null);

  if (!user) return null;

  clearAuthIntent();

  return {
    user,
    intent: pendingIntent || expectedIntent || 'tenant',
  };
}

export function peekAuthIntent() {
  return readAuthIntent();
}

export function clearPendingAuthIntent() {
  clearAuthIntent();
}
