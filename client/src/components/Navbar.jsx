import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { usePGConfig } from '../hooks/usePGConfig';
import { useAuth } from '../hooks/useAuth';
import { useCleaningAlerts } from '../context/CleaningNotificationContext';

export default function Navbar({ links = [] }) {
  const { config } = usePGConfig();
  const { pgId } = useParams();
  const { isAuthenticated, profile, role, isAdmin, signOut } = useAuth();
  const alerts = useCleaningAlerts();
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleLinks = links.filter(
    (link) => !isAuthenticated || !link.to.endsWith('/login')
  );

  const showBell =
    isAuthenticated && (role === 'staff' || (role === 'owner' && isAdmin));
  const pendingCount = alerts?.pendingCount ?? 0;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to={`/${pgId}`} className="flex min-w-0 items-center gap-2 sm:gap-3">
          {config?.logo && (
            <img
              src={config.logo}
              alt=""
              className="h-8 w-8 shrink-0 rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <span className="truncate text-base font-semibold text-primary sm:text-lg">
            {config?.name || 'PG Platform'}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {showBell && pendingCount > 0 && (
            <span
              className="hidden items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 sm:inline-flex"
              title="Pending cleaning requests"
            >
              🧹 {pendingCount}
            </span>
          )}

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="hidden items-center gap-3 lg:flex">
            {visibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-gray-600 transition hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && profile && (
              <>
                <span className="max-w-[120px] truncate text-sm text-gray-500">{profile.name}</span>
                <button
                  type="button"
                  onClick={signOut}
                  className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {showBell && pendingCount > 0 && (
              <div className="mb-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">
                🧹 {pendingCount} cleaning request{pendingCount !== 1 ? 's' : ''} pending
              </div>
            )}
            {visibleLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated && profile && (
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  signOut();
                }}
                className="mt-2 rounded-lg bg-primary px-3 py-2.5 text-left text-sm font-medium text-white"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
