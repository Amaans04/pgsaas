import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../middleware/requireAdmin';
import { getFirestore } from '../../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireAdmin(decoded.uid);
    const db = getFirestore();

    const snapshot = await db
      .collection('users')
      .where('pgId', '==', user.pgId)
      .where('role', '==', 'staff')
      .get();

    const staff = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: doc.id,
        name: data.name,
        email: data.email,
        createdAt: data.createdAt,
      };
    });

    return success(res, staff);
  } catch (err) {
    console.error('staff list error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
