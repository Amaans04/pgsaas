import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireRole } from '../../../../middleware/requireRole';
import { getFirestore } from '../../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    await requireRole(decoded.uid, ['tenant']);
    const db = getFirestore();
    const tenantId = decoded.uid;

    // Query by tenantId only so history survives a move-out (pgId cleared)
    const snapshot = await db
      .collection('rentRecords')
      .where('tenantId', '==', tenantId)
      .get();

    const records = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    records.sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });

    return success(res, records);
  } catch (err) {
    console.error('rent history error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
