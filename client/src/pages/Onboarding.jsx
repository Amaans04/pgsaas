import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/api';
import { establishSession } from '../lib/authSession';
import { useAuth } from '../hooks/useAuth';
import { usePGConfig } from '../hooks/usePGConfig';
import Navbar from '../components/Navbar';

export default function Onboarding() {
  const { pgId } = useParams();
  const navigate = useNavigate();
  const { user, refreshProfile } = useAuth();
  const { config } = usePGConfig();
  const [phone, setPhone] = useState('');
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const name = displayName.trim() || user?.displayName || '';
  const email = user?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return;

    try {
      setLoading(true);
      setError('');

      await establishSession();

      const { data } = await api.post('/api/auth/onboard', {
        role: 'tenant',
        phone,
        name: name || undefined,
      });

      if (!data.success) {
        setError(data.error);
        return;
      }

      await refreshProfile();
      navigate(`/${pgId}/tenant/portal`);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Onboarding failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-lg px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
        <p className="mt-2 text-gray-500">
          Join {config?.name || 'this PG'} as a tenant — add your phone so the owner can find you.
        </p>

        {!name && user && (
          <div className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-700">
            Enter your full name below to continue.
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            {user?.displayName ? (
              <>
                <input
                  type="text"
                  readOnly
                  value={name}
                  className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700"
                />
                <p className="mt-1 text-xs text-gray-400">From your sign-in provider</p>
              </>
            ) : (
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            )}
          </div>

          {email && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                readOnly
                value={email}
                className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1 text-xs text-gray-400">Required so your PG owner can add you to a room</p>
          </div>

          <button
            type="submit"
            disabled={loading || !name}
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Setting up...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
}
