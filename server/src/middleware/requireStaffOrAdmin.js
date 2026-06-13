import { requireRole } from './requireRole';
import { isAdminEmail } from '../config/admins';

/**
 * Allows PG staff, or owners that are on the admin whitelist.
 * Staff get read/resolve access to operational data only — payment
 * routes must keep using requireAdmin.
 */
export async function requireStaffOrAdmin(uid) {
  const user = await requireRole(uid, ['owner', 'staff']);

  if (user.role === 'owner') {
    const email = (user.email || '').toLowerCase();
    if (!isAdminEmail(email, user.pgId)) {
      const err = new Error('Admin access denied for this account');
      err.statusCode = 403;
      throw err;
    }
  }

  return user;
}
