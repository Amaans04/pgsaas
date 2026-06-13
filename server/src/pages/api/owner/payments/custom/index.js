import { handleCors } from '../../../../../lib/cors';
import { success, error } from '../../../../../lib/apiResponse';
import { verifyAuth } from '../../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../../middleware/requireAdmin';
import { getFirestore } from '../../../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireAdmin(decoded.uid);
    const db = getFirestore();

    const snapshot = await db.collection('customPayments').where('pgId', '==', user.pgId).get();

    const nameCache = {};
    const payments = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        if (!nameCache[data.tenantId]) {
          const userDoc = await db.collection('users').doc(data.tenantId).get();
          nameCache[data.tenantId] = userDoc.exists ? userDoc.data().name : 'Unknown';
        }
        return { id: doc.id, ...data, tenantName: nameCache[data.tenantId] };
      })
    );

    payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return success(res, payments);
  } catch (err) {
    console.error('custom payments list error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
