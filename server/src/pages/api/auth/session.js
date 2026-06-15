import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyFirebase } from '../../../middleware/verifyFirebase';
import { createTokenPair, REFRESH_EXPIRY_SECONDS } from '../../../lib/jwt';
import { rateLimit } from '../../../middleware/rateLimit';
import { getFirestore } from '../../../lib/firebaseAdmin';
import { storeRefreshToken } from '../../../lib/refreshTokenStore';
import { setRefreshCookie } from '../../../lib/cookies';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    rateLimit(req, {
      maxRequests: process.env.NODE_ENV === 'development' ? 120 : 30,
      keyPrefix: 'session',
    });
    const firebaseUser = await verifyFirebase(req);
    const tokens = createTokenPair({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.name,
    });

    const db = getFirestore();
    await storeRefreshToken(db, tokens.jti, firebaseUser.uid);
    setRefreshCookie(res, tokens.refreshToken, REFRESH_EXPIRY_SECONDS);

    return success(res, { accessToken: tokens.accessToken, expiresIn: tokens.expiresIn });
  } catch (err) {
    console.error('session error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
