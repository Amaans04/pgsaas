import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { getImageKit, getImageKitPublicKey } from '../../../lib/imagekit';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
      return error(res, 'Method not allowed', 405);
    }

    await verifyAuth(req);

    const authParams = getImageKit().getAuthenticationParameters();
    return success(res, {
      ...authParams,
      publicKey: getImageKitPublicKey(),
    });
  } catch (err) {
    console.error('imagekit auth error:', err);
    if (err.code === 'IMAGEKIT_NOT_CONFIGURED') {
      return error(res, err.message, 503);
    }
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
