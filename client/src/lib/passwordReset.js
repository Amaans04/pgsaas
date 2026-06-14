import { sendPasswordResetEmail } from 'firebase/auth';
import { mapFirebaseAuthError } from './authErrors';

const HIDE_EXISTENCE_CODES = new Set([
  'auth/user-not-found',
  'auth/invalid-credential',
]);

/**
 * After reset, Firebase redirects here. Must be listed under
 * Firebase Console → Authentication → Settings → Authorized domains.
 */
export function getPasswordResetContinueUrl(pgId, loginPath = 'login') {
  if (typeof window === 'undefined' || !pgId) return undefined;
  return `${window.location.origin}/${pgId}/${loginPath}`;
}

export async function requestPasswordReset(auth, email, pgId, options = {}) {
  const { loginPath = 'login' } = options;
  const normalizedEmail = email.trim().toLowerCase();
  const continueUrl = getPasswordResetContinueUrl(pgId, loginPath);

  const actionCodeSettings = continueUrl
    ? { url: continueUrl, handleCodeInApp: false }
    : undefined;

  try {
    await sendPasswordResetEmail(auth, normalizedEmail, actionCodeSettings);
    return {
      ok: true,
      message: 'If an account exists for that email, a password reset link has been sent.',
    };
  } catch (err) {
    if (HIDE_EXISTENCE_CODES.has(err?.code)) {
      return {
        ok: true,
        message: 'If an account exists for that email, a password reset link has been sent.',
      };
    }
    throw err;
  }
}

export function getPasswordResetErrorMessage(err) {
  if (err?.code === 'auth/invalid-continue-uri' || err?.code === 'auth/unauthorized-continue-uri') {
    return (
      'Password reset link could not be generated. Add this site to Firebase → Authentication → ' +
      'Settings → Authorized domains (e.g. localhost and your Vercel domain), then try again.'
    );
  }
  return mapFirebaseAuthError(err);
}
