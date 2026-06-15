import { Link, Navigate, useParams } from 'react-router-dom';
import { usePGConfig } from '../hooks/usePGConfig';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import { getAuthHomePath } from '../lib/authRedirect';

export default function Landing() {
  const { config, loading: configLoading, error } = usePGConfig();
  const { pgId } = useParams();
  const { isAuthenticated, profile, loading: authLoading, profileLoading } = useAuth();

  if (configLoading || authLoading || (isAuthenticated && !profile && profileLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated && profile) {
    return <Navigate to={getAuthHomePath(profile, pgId)} replace />;
  }

  if (error || !config) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">{error || 'PG not found'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar links={[{ to: `/${pgId}/login`, label: 'Login' }]} />

      <section className="bg-brand-soft relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28">
        <div className="animate-fade-up mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Now accepting residents
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {config.name}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600 sm:text-xl">{config.tagline}</p>
          <p className="mt-3 text-sm text-gray-500">{config.address}</p>
          <Link
            to={`/${pgId}/login`}
            className="btn-lift mt-9 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-semibold text-white shadow-lg hover:shadow-2xl"
          >
            Tenant Login
            <span aria-hidden="true">→</span>
          </Link>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
            <Link
              to={`/${pgId}/admin/login`}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Owner Login
            </Link>
            <Link
              to={`/${pgId}/staff/login`}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900">Amenities</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {config.amenities?.map((amenity) => (
            <span
              key={amenity}
              className="rounded-full border border-black/5 bg-secondary px-4 py-2 text-sm font-medium text-primary shadow-sm"
            >
              {amenity}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900">Room Types</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {config.roomTypes?.map((type) => (
              <div
                key={type}
                className="card-hover rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-xl">
                  🛏️
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{type}</h3>
                <p className="mt-2 text-sm text-gray-500">Comfortable shared living</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-slate-50 px-4 py-10 text-center text-sm text-gray-500">
        <p className="font-medium text-gray-600">{config.name}</p>
        <p className="mt-2">{config.phone} · {config.email}</p>
        <p className="mt-1">Rent due on the {config.rentDueDate}th of every month</p>
      </footer>
    </div>
  );
}
