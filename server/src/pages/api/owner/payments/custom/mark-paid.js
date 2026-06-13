import { handleCors } from '../../../../../lib/cors';
import { success, error } from '../../../../../lib/apiResponse';
import { verifyAuth } from '../../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../../middleware/requireAdmin';
import { getFirestore } from '../../../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireAdmin(decoded.uid);
    const db = getFirestore();

    const { paymentId } = req.body;

    if (!paymentId) {
      return error(res, 'paymentId is required', 400);
    }

    const paymentRef = db.collection('customPayments').doc(paymentId);
    const paymentDoc = await paymentRef.get();

    if (!paymentDoc.exists || paymentDoc.data().pgId !== user.pgId) {
      return error(res, 'Payment not found in your PG', 404);
    }

    if (paymentDoc.data().status === 'paid') {
      return error(res, 'Payment is already marked as paid', 400);
    }

    const paidAt = new Date().toISOString();
    await paymentRef.update({
      status: 'paid',
      paymentMethod: 'cash',
      paidAt,
    });

    return success(res, { paymentId, status: 'paid', paymentMethod: 'cash', paidAt });
  } catch (err) {
    console.error('mark paid error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
