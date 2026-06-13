import { Link, useParams } from 'react-router-dom';
import { usePGConfig } from '../hooks/usePGConfig';
import { useAuth } from '../hooks/useAuth';

export default function Navbar({ links = [] }) {
  const { config } = usePGConfig();
  const { pgId } = useParams();
  const { isAuthenticated, profile, signOut } = useAuth();

  // Hide guest-only links (e.g. Login) once signed in; keep page nav links (Rooms, Tenants, etc.)
  const visibleLinks = links.filter(
    (link) => !isAuthenticated || !link.to.endsWith('/login')
  );

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to={`/${pgId}`} className="flex items-center gap-3">
          {config?.logo && (
            <img src={config.logo} alt={config.name} className="h-8 w-8 rounded-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
          )}
          <span className="text-lg font-semibold text-primary">{config?.name || 'PG Platform'}</span>
        </Link>

        <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
          {visibleLinks.map((link) => (
            <Link key={link.to} to={link.to} className="text-sm font-medium text-gray-600 hover:text-primary">
              {link.label}
            </Link>
          ))}
          {isAuthenticated && profile && (
            <>
              <span className="hidden text-sm text-gray-500 sm:inline">{profile.name}</span>
              <button
                onClick={signOut}
                className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
