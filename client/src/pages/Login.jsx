import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import api from '../lib/api';
import { getAuthHomePath } from '../lib/authRedirect';
import { startGoogleSignIn, finishGoogleRedirectSignIn } from '../lib/googleAuth';
import { usePGConfig } from '../hooks/usePGConfig';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from '../lib/passwordPolicy';
import { isEmailNotVerifiedError, mapFirebaseAuthError, mapSessionError } from '../lib/authErrors';
import { getPasswordResetErrorMessage, requestPasswordReset } from '../lib/passwordReset';

async function completeSignIn(refreshProfile, pgId, navigate) {
  try {
    const profile = await refreshProfile({ force: true });
    navigate(getAuthHomePath(profile, pgId));
  } catch (sessionErr) {
    throw mapSessionError(sessionErr);
  }
}

export default function Login() {
  const { config } = usePGConfig();
  const { pgId } = useParams();
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();

  const [mode, setMode] = useState('signin');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState('');

  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      setInfo('');
      const user = await startGoogleSignIn();
      if (!user) return;
      await completeSignIn(refreshProfile, pgId, navigate);
    } catch (err) {
      setError(mapFirebaseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const redirect = await finishGoogleRedirectSignIn('tenant');
        if (!redirect?.user || cancelled) return;
        setLoading(true);
        await completeSignIn(refreshProfile, pgId, navigate);
      } catch (err) {
        if (!cancelled) setError(mapFirebaseAuthError(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pgId, navigate, refreshProfile]);

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
      await completeSignIn(refreshProfile, pgId, navigate);
    } catch (err) {
      if (err.code === 'EMAIL_NOT_VERIFIED' || isEmailNotVerifiedError(err)) {
        setPendingVerificationEmail(signInForm.email.trim().toLowerCase());
        setError(err.message || 'Verify your email before signing in. Check your inbox for the verification link.');
      } else {
        setError(mapFirebaseAuthError(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');

    const nameErr = validateName(signUpForm.name);
    const emailErr = validateEmail(signUpForm.email);
    const phoneErr = validatePhone(signUpForm.phone);
    const passwordErr = validatePassword(signUpForm.password);

    if (nameErr || emailErr || phoneErr || passwordErr) {
      setError(nameErr || emailErr || phoneErr || passwordErr);
      return;
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const email = signUpForm.email.trim().toLowerCase();

      const { data } = await api.post('/api/auth/register', {
        name: signUpForm.name.trim(),
        email,
        phone: signUpForm.phone.trim(),
        password: signUpForm.password,
      });

      if (!data.success) {
        setError(data.error || 'Registration failed');
        return;
      }

      await signInWithEmailAndPassword(auth, email, signUpForm.password);

      if (auth.currentUser && !auth.currentUser.emailVerified) {
        await sendEmailVerification(auth.currentUser);
      }

      await firebaseSignOut(auth);

      setPendingVerificationEmail(email);
      setInfo(
        data.data?.requiresEmailVerification === false
          ? 'Account ready. Sign in with your email and password.'
          : 'Account created. We sent a verification link to your email — verify it, then sign in.'
      );
      setMode('signin');
      setSignInForm({ email, password: '' });
      setSignUpForm({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    } catch (err) {
      setError(err.response?.data?.error || mapFirebaseAuthError(err));
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
      const result = await requestPasswordReset(auth, signInForm.email, pgId, { loginPath: 'login' });
      setInfo(result.message);
    } catch (err) {
      setError(getPasswordResetErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!auth.currentUser) {
      setError('Sign in once with your email and password, then click resend.');
      return;
    }
    try {
      setLoading(true);
      await sendEmailVerification(auth.currentUser);
      setInfo(`Verification email sent to ${auth.currentUser.email}`);
    } catch (err) {
      setError(mapFirebaseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-brand-soft min-h-screen">
      <Navbar />
      <div className="flex min-h-[calc(100vh-57px)] items-center justify-center px-4 py-8">
        <div className="animate-fade-up w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
          <h1 className="text-center text-2xl font-bold text-gray-900">
            Welcome to {config?.name || 'PG Platform'}
          </h1>
          <p className="mt-2 text-center text-gray-500">Sign in to your tenant portal</p>

          <div className="mt-6 flex rounded-lg bg-gray-100 p-1">
            <button
              type="button"
              onClick={() => { setMode('signin'); setError(''); setInfo(''); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
                mode === 'signin' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(''); setInfo(''); }}
              className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
                mode === 'signup' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'
              }`}
            >
              Create Account
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}
          {info && (
            <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{info}</div>
          )}

          {pendingVerificationEmail && (
            <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
              <p>Waiting for verification: <strong>{pendingVerificationEmail}</strong></p>
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={loading}
                className="mt-2 font-medium text-primary hover:underline disabled:opacity-50"
              >
                Resend verification email
              </button>
            </div>
          )}

          {mode === 'signin' ? (
            <form onSubmit={handleEmailSignIn} className="mt-6 space-y-4">
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
                className="btn-lift w-full rounded-lg bg-primary py-2.5 font-semibold text-white shadow-sm hover:shadow-md disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in with Email'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignUp} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  autoComplete="name"
                  required
                  value={signUpForm.name}
                  onChange={(e) => setSignUpForm({ ...signUpForm, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={signUpForm.email}
                  onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="9876543210"
                  value={signUpForm.phone}
                  onChange={(e) => setSignUpForm({ ...signUpForm, phone: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  required
                  value={signUpForm.password}
                  onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <p className="mt-1 text-xs text-gray-400">Min 8 characters, with letters and numbers</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  required
                  value={signUpForm.confirmPassword}
                  onChange={(e) => setSignUpForm({ ...signUpForm, confirmPassword: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-lift w-full rounded-lg bg-primary py-2.5 font-semibold text-white shadow-sm hover:shadow-md disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
          )}

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
            Continue with Google
          </button>

          <p className="mt-6 text-center text-xs text-gray-400">
            Staff?{' '}
            <Link to={`/${pgId}/staff/login`} className="text-primary hover:underline">
              Staff login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
