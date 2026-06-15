import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function AdminRoute({ children }) {
  const { pgId } = useParams();
  const location = useLocation();
  const { isAuthenticated, isAdmin, needsPasswordSetup, loading, refreshProfile } = useAuth();
  const retriedRef = useRef(false);
  const [checkDone, setCheckDone] = useState(false);
  const onSetupPage = location.pathname.includes('/owner/setup');

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      setCheckDone(true);
      return;
    }

    if (isAdmin) {
      setCheckDone(true);
      return;
    }

    if (retriedRef.current) return;

    retriedRef.current = true;
    refreshProfile({ force: true }).finally(() => setCheckDone(true));
  }, [loading, isAuthenticated, isAdmin, refreshProfile]);

  if (loading || (isAuthenticated && !checkDone)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to={`/${pgId}/admin/login`} replace />;
  }

  if (needsPasswordSetup && !onSetupPage) {
    return <Navigate to={`/${pgId}/owner/setup`} replace />;
  }

  return children;
}
