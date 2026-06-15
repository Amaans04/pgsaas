import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../../lib/firebase';
import api from '../../lib/api';
import { establishSession, endSession } from '../../lib/authSession';
import {
  startGoogleSignIn,
  finishGoogleRedirectSignIn,
  peekAuthIntent,
  clearPendingAuthIntent,
} from '../../lib/googleAuth';
import { usePGConfig } from '../../hooks/usePGConfig';
import { useAuth } from '../../hooks/useAuth';
import { validateEmail } from '../../lib/passwordPolicy';
import { mapFirebaseAuthError } from '../../lib/authErrors';
import { getPasswordResetErrorMessage, requestPasswordReset } from '../../lib/passwordReset';

export default function AdminLogin() {
  const { config } = usePGConfig();
  const { pgId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading, refreshProfile, patchProfile } = useAuth();
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const redirectHandledRef = useRef(false);

  const completeAdminSignIn = useCallback(async () => {
    await establishSession();

    const { data } = await api.post('/api/auth/admin-login', { sitePgId: pgId });

    if (!data.success) {
      await endSession();
      await signOut(auth);
      setError(data.error || 'Admin access denied');
      return false;
    }

    patchProfile({
      role: 'owner',
      pgId,
      isAdmin: true,
      onboarded: true,
      needsPasswordSetup: data.data?.needsPasswordSetup === true,
    });

    await refreshProfile({ force: true });

    if (data.data?.needsPasswordSetup) {
      navigate(`/${pgId}/owner/setup`, { replace: true });
    } else {
      navigate(`/${pgId}/owner/dashboard`, { replace: true });
    }
    return true;
  }, [navigate, patchProfile, pgId, refreshProfile]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      setInfo('');

      const signedInUser = await startGoogleSignIn('admin');
      if (!signedInUser) return;
      await completeAdminSignIn();
    } catch (err) {
      await endSession();
      await signOut(auth).catch(() => {});
      if (err.code === 'auth/configuration-not-found') {
        setError(
          'Google Sign-In is not enabled in Firebase yet. Enable it in Firebase Console → Authentication → Sign-in method.'
        );
      } else {
        setError(err.response?.data?.error || err.message || mapFirebaseAuthError(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');

    const emailErr = validateEmail(signInForm.email);
    if (emailErr) {
      setError(emailErr);
      return;
    }
    if (!signInForm.password) {
      setError('Enter your password');
      return;
    }

    try {
      setLoading(true);
      const email = signInForm.email.trim().toLowerCase();
      await signInWithEmailAndPassword(auth, email, signInForm.password);
      await completeAdminSignIn();
    } catch (err) {
      await endSession();
      await signOut(auth).catch(() => {});
      const msg = err.response?.data?.error || err.message || '';
      setError(msg || mapFirebaseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    setInfo('');
    const emailErr = validateEmail(signInForm.email);
    if (emailErr) {
      setError('Enter your email above, then click Forgot password.');
      return;
    }
    try {
      setLoading(true);
      const result = await requestPasswordReset(auth, signInForm.email, pgId, {
        loginPath: 'admin/login',
      });
      setInfo(result.message);
    } catch (err) {
      setError(getPasswordResetErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading || redirectHandledRef.current) return;

    let cancelled = false;

    (async () => {
      try {
        const redirect = await finishGoogleRedirectSignIn('admin');
        const pendingIntent = peekAuthIntent();
        const shouldComplete =
          redirect?.user ||
          (user && (pendingIntent === 'admin' || redirect?.intent === 'admin'));

        if (!shouldComplete || cancelled) return;

        redirectHandledRef.current = true;
        clearPendingAuthIntent();
        setLoading(true);
        await completeAdminSignIn();
      } catch (err) {
        if (cancelled) return;
        redirectHandledRef.current = false;
        await endSession();
        await signOut(auth).catch(() => {});
        const msg = err.response?.data?.error || err.message || '';
        setError(msg || mapFirebaseAuthError(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user, completeAdminSignIn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="animate-fade-up w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-black/5">
          <div className="mb-6 text-center">
            <span className="inline-block rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Admin
            </span>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              {config?.name || 'PG'} — Owner Panel
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Sign in with email or Google — authorized accounts only
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}
          {info && (
            <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{info}</div>
          )}

          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={signInForm.email}
                onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="text-xs font-medium text-primary hover:underline disabled:opacity-50"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={signInForm.password}
                onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-lift w-full rounded-lg bg-gray-900 py-2.5 font-semibold text-white shadow-sm hover:bg-gray-800 hover:shadow-md disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in with Email'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {loading ? 'Signing in...' : 'Continue with Google'}
          </button>

          <p className="mt-6 text-center text-xs text-gray-400">
            <Link to={`/${pgId}/login`} className="hover:text-gray-600">
              ← Back to tenant login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
