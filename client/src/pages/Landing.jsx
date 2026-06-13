import { Link, Navigate, useParams } from 'react-router-dom';
import { usePGConfig } from '../hooks/usePGConfig';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import { getAuthHomePath } from '../lib/authRedirect';

export default function Landing() {
  const { config, loading: configLoading, error } = usePGConfig();
  const { pgId } = useParams();
  const { isAuthenticated, profile, loading: authLoading } = useAuth();

  if (configLoading || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
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
    <div className="min-h-screen bg-gray-50">
      <Navbar links={[{ to: `/${pgId}/login`, label: 'Login' }]} />

      <section className="bg-secondary px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">{config.name}</h1>
          <p className="mt-4 text-xl text-gray-600">{config.tagline}</p>
          <p className="mt-2 text-gray-500">{config.address}</p>
          <Link
            to={`/${pgId}/login`}
            className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-white shadow-lg hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Amenities</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {config.amenities?.map((amenity) => (
            <span key={amenity} className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-primary">
              {amenity}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Room Types</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {config.roomTypes?.map((type) => (
              <div key={type} className="rounded-xl border border-gray-200 p-6 text-center shadow-sm">
                <h3 className="text-lg font-semibold text-primary">{type}</h3>
                <p className="mt-2 text-sm text-gray-500">Comfortable shared living</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
        <p>{config.phone} · {config.email}</p>
        <p className="mt-1">Rent due on the {config.rentDueDate}th of every month</p>
      </footer>
    </div>
  );
}
