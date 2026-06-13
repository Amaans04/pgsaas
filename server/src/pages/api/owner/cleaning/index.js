import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireStaffOrAdmin } from '../../../../middleware/requireStaffOrAdmin';
import { getFirestore } from '../../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireStaffOrAdmin(decoded.uid);
    const db = getFirestore();
    const pgId = user.pgId;

    const snapshot = await db.collection('cleaningRequests').where('pgId', '==', pgId).get();

    const requests = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    requests.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const pendingCount = requests.filter((r) => r.status === 'pending').length;

    return success(res, { requests, pendingCount });
  } catch (err) {
    console.error('cleaning list error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
