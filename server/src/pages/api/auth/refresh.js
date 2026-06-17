import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import {
  verifyRefreshToken,
  createAccessTokenFromRefresh,
  createRefreshToken,
  REFRESH_EXPIRY_SECONDS,
} from '../../../lib/jwt';
import { rateLimit, RATE_LIMITS } from '../../../middleware/rateLimit';
import { getFirestore } from '../../../lib/firebaseAdmin';
import { getRefreshCookie, setRefreshCookie, clearRefreshCookie } from '../../../lib/cookies';
import { isRefreshTokenActive, revokeRefreshToken, revokeAllForUser, storeRefreshToken } from '../../../lib/refreshTokenStore';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    rateLimit(req, RATE_LIMITS.auth);

    const refreshToken = getRefreshCookie(req);
    if (!refreshToken) {
      return error(res, 'Refresh token is required', 401);
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch {
      clearRefreshCookie(res);
      return error(res, 'Invalid or expired refresh token', 401);
    }

    const db = getFirestore();
    const active = await isRefreshTokenActive(db, decoded.jti, decoded.sub);

    if (!active) {
      // Token was already rotated/revoked but presented again - treat as possible theft.
      await revokeAllForUser(db, decoded.sub);
      clearRefreshCookie(res);
      return error(res, 'Invalid or expired refresh token', 401);
    }

    await revokeRefreshToken(db, decoded.jti);
    const { refreshToken: newRefreshToken, jti: newJti } = createRefreshToken({
      uid: decoded.sub,
      email: decoded.email,
      name: decoded.name,
    });
    await storeRefreshToken(db, newJti, decoded.sub);
    setRefreshCookie(res, newRefreshToken, REFRESH_EXPIRY_SECONDS);

    const accessToken = createAccessTokenFromRefresh(decoded);

    return success(res, {
      accessToken,
      expiresIn: 900,
    });
  } catch (err) {
    console.error('refresh error:', err);
    clearRefreshCookie(res);
    return error(res, 'Invalid or expired refresh token', 401);
  }
}
