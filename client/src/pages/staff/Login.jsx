import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { establishSession } from '../../lib/authSession';
import { clearAccessToken } from '../../lib/tokenStorage';
import { usePGConfig } from '../../hooks/usePGConfig';
import { useAuth } from '../../hooks/useAuth';

export default function StaffLogin() {
  const { config } = usePGConfig();
  const { pgId } = useParams();
  const navigate = useNavigate();
  const { refreshProfile, signOut } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      await signInWithEmailAndPassword(auth, form.email, form.password);
      await establishSession();
      const profile = await refreshProfile();

      if (profile?.role === 'staff') {
        navigate(`/${pgId}/staff/dashboard`);
      } else {
        clearAccessToken();
        await signOut();
        setError('This account is not a staff account');
      }
    } catch (err) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setError('Invalid email or password');
      } else {
        setError(err.response?.data?.error || err.message || 'Sign in failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <span className="inline-block rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Staff
            </span>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">
              {config?.name || 'PG'} — Staff Login
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Use the email and password shared by your PG owner
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

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
