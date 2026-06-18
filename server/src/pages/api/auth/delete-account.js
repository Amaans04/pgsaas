import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { rateLimit, RATE_LIMITS } from '../../../middleware/rateLimit';
import { deleteUserAccountData } from '../../../lib/deleteAccount';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'DELETE') {
      return error(res, 'Method not allowed', 405);
    }

    rateLimit(req, RATE_LIMITS.sensitive);

    const decoded = await verifyAuth(req);
    const result = await deleteUserAccountData(decoded.uid);

    return success(res, { uid: decoded.uid, ...result });
  } catch (err) {
    console.error('delete-account error:', err);
    return error(res, err.message || 'Account deletion failed', err.statusCode || 500);
  }
}
