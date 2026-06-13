import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireStaffOrAdmin } from '../../../../middleware/requireStaffOrAdmin';
import { getFirestore } from '../../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireStaffOrAdmin(decoded.uid);
    const db = getFirestore();
    const pgId = user.pgId;

    const { requestId } = req.body;
    if (!requestId) {
      return error(res, 'requestId is required', 400);
    }

    const ref = db.collection('cleaningRequests').doc(String(requestId));
    const doc = await ref.get();

    if (!doc.exists || doc.data().pgId !== pgId) {
      return error(res, 'Cleaning request not found', 404);
    }

    if (doc.data().status === 'done') {
      return error(res, 'Already marked as done', 400);
    }

    const resolvedAt = new Date().toISOString();
    await ref.update({
      status: 'done',
      resolvedAt,
      resolvedBy: decoded.uid,
    });

    return success(res, { requestId, status: 'done', resolvedAt });
  } catch (err) {
    console.error('cleaning resolve error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
