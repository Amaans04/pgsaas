import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getAuthHomePath } from '../lib/authRedirect';

/**
 * For public-only pages (login, landing). Redirects signed-in users
 * to their dashboard instead of showing login buttons again.
 */
export default function GuestRoute({ children }) {
  const { pgId } = useParams();
  const { isAuthenticated, profile, loading, profileLoading } = useAuth();

  if (loading || (isAuthenticated && !profile && profileLoading)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated && profile) {
    return <Navigate to={getAuthHomePath(profile, pgId)} replace />;
  }

  return children;
}
