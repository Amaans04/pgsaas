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

    const snapshot = await db.collection('complaints').where('pgId', '==', pgId).get();

    const complaints = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = doc.data();
        let tenantName = 'Unknown';
        const tenantDoc = await db.collection('users').doc(data.tenantId).get();
        if (tenantDoc.exists) {
          tenantName = tenantDoc.data().name;
        }
        return { id: doc.id, ...data, tenantName };
      })
    );

    complaints.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return success(res, complaints);
  } catch (err) {
    console.error('owner complaints error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
