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

    const snapshot = await db
      .collection('customPayments')
      .where('tenantId', '==', decoded.uid)
      .get();

    const payments = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return success(res, payments);
  } catch (err) {
    console.error('tenant custom payments error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
