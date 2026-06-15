import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../lib/api';
import { useAuth } from '../hooks/useAuth';
import { usePGConfig } from '../hooks/usePGConfig';
import { getAuthHomePath, isProfileOnboarded } from '../lib/authRedirect';
import { loadProfileWithRetry } from '../lib/tenantAuth';
import { nameFromEmail } from '../lib/nameFromEmail';
import Navbar from '../components/Navbar';

export default function Onboarding() {
  const { pgId } = useParams();
  const navigate = useNavigate();
  const { user, profile, refreshProfile, patchProfile, loading: authLoading } = useAuth();
  const { config } = usePGConfig();
  const [phone, setPhone] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fromProvider = user.displayName?.trim();
    const fromEmail = nameFromEmail(user.email);
    setDisplayName(fromProvider || fromEmail || '');
  }, [user]);

  useEffect(() => {
    if (profile?.phone) {
      setPhone(profile.phone);
    }
  }, [profile?.phone]);

  useEffect(() => {
    if (authLoading || !user) return;

    let cancelled = false;

    (async () => {
      try {
        setChecking(true);
        const latestProfile = await loadProfileWithRetry(refreshProfile);

        if (cancelled) return;

        if (isProfileOnboarded(latestProfile)) {
          navigate(getAuthHomePath(latestProfile, pgId), { replace: true });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.error || err.message || 'Could not load your profile');
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authLoading, user, pgId, navigate, refreshProfile]);

  const name = displayName.trim();
  const email = user?.email || '';

  if (authLoading || checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) return;

    try {
      setLoading(true);
      setError('');

      const { data } = await api.post('/api/auth/onboard', {
        role: 'tenant',
        phone,
        name,
      });

      if (!data.success) {
        setError(data.error);
        return;
      }

      if (data.data?.profile) {
        patchProfile(data.data.profile);
      }

      const latestProfile = (await refreshProfile({ force: true })) || data.data?.profile;
      navigate(getAuthHomePath(latestProfile, pgId), { replace: true });
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

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="mt-1 text-xs text-gray-400">
              Pre-filled from your email — you can edit this
            </p>
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
              placeholder="9876543210"
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
