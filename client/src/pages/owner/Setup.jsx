import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import api from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';
import { usePGConfig } from '../../hooks/usePGConfig';
import Navbar from '../../components/Navbar';
import { validatePassword } from '../../lib/passwordPolicy';

export default function OwnerSetup() {
  const { pgId } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin, needsPasswordSetup, loading: authLoading, refreshProfile } = useAuth();
  const { config } = usePGConfig();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to={`/${pgId}/admin/login`} replace />;
  }

  if (!needsPasswordSetup) {
    return <Navigate to={`/${pgId}/owner/dashboard`} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

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
      const { data } = await api.post('/api/auth/set-password', { password });
      if (!data.success) {
        setError(data.error || 'Could not save password');
        return;
      }
      await refreshProfile({ force: true });
      navigate(`/${pgId}/owner/dashboard`, { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Setup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="mx-auto max-w-md px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Set your owner password</h1>
        <p className="mt-2 text-sm text-gray-500">
          Welcome to {config?.name || 'your PG'}. Create a password for{' '}
          <strong>{user?.email}</strong> so you can also sign in with email.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1 text-xs text-gray-400">Min 8 characters, with letters and numbers</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm password</label>
            <input
              type="password"
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-900 py-2.5 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save & continue to dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
