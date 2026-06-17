import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { getFirestore } from '../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const { pushToken } = req.body;

    if (!pushToken || typeof pushToken !== 'string') {
      return error(res, 'pushToken is required', 400);
    }

    const db = getFirestore();
    await db.collection('users').doc(decoded.uid).set(
      {
        pushToken: pushToken.trim(),
        pushTokenUpdatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return success(res, { updated: true });
  } catch (err) {
    console.error('update-push-token error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
