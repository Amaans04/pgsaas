import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminRoute({ children }) {
  const { pgId } = useParams();
  const { isAuthenticated, isAdmin, loading, refreshProfile } = useAuth();
  const [retried, setRetried] = useState(false);

  useEffect(() => {
    if (loading || !isAuthenticated || isAdmin || retried) return;

    let cancelled = false;
    (async () => {
      await refreshProfile({ force: true });
      if (!cancelled) setRetried(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [loading, isAuthenticated, isAdmin, retried, refreshProfile]);

  if (loading || (isAuthenticated && !isAdmin && !retried)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to={`/${pgId}/admin/login`} replace />;
  }

  return children;
}
