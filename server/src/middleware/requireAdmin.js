import { requireRole } from './requireRole';
import { isAdminEmail } from '../config/admins';

export async function requireAdmin(uid) {
  const user = await requireRole(uid, ['owner']);
  const email = (user.email || '').toLowerCase();

  if (!isAdminEmail(email, user.pgId)) {
    const err = new Error('Admin access denied for this account');
    err.statusCode = 403;
    throw err;
  }

  return user;
}
