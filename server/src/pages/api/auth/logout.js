import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyRefreshToken } from '../../../lib/jwt';
import { getFirestore } from '../../../lib/firebaseAdmin';
import { getRefreshCookie, clearRefreshCookie } from '../../../lib/cookies';
import { revokeRefreshToken } from '../../../lib/refreshTokenStore';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    const refreshToken = getRefreshCookie(req);
    if (refreshToken) {
      try {
        const decoded = verifyRefreshToken(refreshToken);
        const db = getFirestore();
        await revokeRefreshToken(db, decoded.jti);
      } catch {
        // Token already invalid/expired - nothing to revoke.
      }
    }

    clearRefreshCookie(res);
    return success(res, { loggedOut: true });
  } catch (err) {
    console.error('logout error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
