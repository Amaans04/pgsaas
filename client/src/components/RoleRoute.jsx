import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function RoleRoute({ allowedRole, children }) {
  const { pgId } = useParams();
  const { role, loading, isOnboarded, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isOnboarded) {
    return <Navigate to={`/${pgId}/onboarding`} replace />;
  }

  if (role !== allowedRole) {
    if (isAdmin) {
      return <Navigate to={`/${pgId}/owner/dashboard`} replace />;
    }
    if (role === 'staff') {
      return <Navigate to={`/${pgId}/staff/dashboard`} replace />;
    }
    return <Navigate to={`/${pgId}/tenant/portal`} replace />;
  }

  return children;
}
