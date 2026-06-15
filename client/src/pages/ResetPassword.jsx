import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { validatePassword } from '../lib/passwordPolicy';
import { mapFirebaseAuthError } from '../lib/authErrors';
import Navbar from '../components/Navbar';

export default function ResetPassword() {
  const { pgId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const oobCode = searchParams.get('oobCode');
  const mode = searchParams.get('mode');
  const nextPath = searchParams.get('next') || 'login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeValid, setCodeValid] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (mode !== 'resetPassword' || !oobCode) {
      setChecking(false);
      setError('Invalid or expired reset link. Request a new one from the login page.');
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const accountEmail = await verifyPasswordResetCode(auth, oobCode);
        if (!cancelled) {
          setEmail(accountEmail);
          setCodeValid(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(mapFirebaseAuthError(err));
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mode, oobCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfo('');

    const passwordErr = validatePassword(password);
    if (passwordErr) {
      setError(passwordErr);
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await confirmPasswordReset(auth, oobCode, password);
      setInfo('Password updated. You can sign in now.');
      setTimeout(() => {
        navigate(`/${pgId}/${nextPath}`, { replace: true });
      }, 1200);
    } catch (err) {
      setError(mapFirebaseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-md px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Set a new password</h1>
        {email && (
          <p className="mt-2 text-sm text-gray-500">
            for <strong>{email}</strong>
          </p>
        )}

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}
        {info && (
          <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{info}</div>
        )}

        {codeValid ? (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">New password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm password</label>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary py-2.5 font-semibold text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Update password'}
            </button>
          </form>
        ) : (
          <p className="mt-6 text-sm text-gray-500">
            <Link to={`/${pgId}/${nextPath}`} className="text-primary hover:underline">
              ← Back to login
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
