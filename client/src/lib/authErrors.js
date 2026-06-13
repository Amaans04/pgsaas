const GENERIC_SIGN_IN = 'Invalid email or password. Please try again.';

export function mapFirebaseAuthError(err) {
  const code = err?.code || '';

  switch (code) {
    case 'auth/invalid-email':
      return 'Enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Contact support.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return GENERIC_SIGN_IN;
    case 'auth/too-many-requests':
      return 'Too many attempts. Wait a few minutes and try again.';
    case 'auth/email-already-in-use':
      return 'Unable to create account. If you already have an account, try signing in.';
    case 'auth/weak-password':
      return 'Password is too weak. Use at least 8 characters with letters and numbers.';
    case 'auth/configuration-not-found':
      return 'Email/Password sign-in is not enabled in Firebase yet. Enable it under Authentication → Sign-in method.';
    default:
      if (err?.response?.data?.error) {
        return err.response.data.error;
      }
      return err?.message || 'Something went wrong. Please try again.';
  }
}

export function isEmailNotVerifiedError(err) {
  return (
    err?.response?.status === 403 &&
    (err?.response?.data?.error || '').toLowerCase().includes('verify your email')
  );
}

export function mapSessionError(err) {
  if (err?.response?.status === 403) {
    const verifyErr = new Error(err.response.data?.error || 'Email not verified');
    verifyErr.code = 'EMAIL_NOT_VERIFIED';
    return verifyErr;
  }
  if (err?.response?.data?.error) {
    return new Error(err.response.data.error);
  }
  if (err?.response?.status >= 500) {
    return new Error(
      'The server failed to start your session. Stop the API server, run `npm run dev:fresh` in pgplatform/server, then try again.'
    );
  }
  return err instanceof Error ? err : new Error('Failed to sign in');
}
