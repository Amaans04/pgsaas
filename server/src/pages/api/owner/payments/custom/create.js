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
    const pgId = user.pgId;

    const { tenantId, title, amount, dueDate } = req.body;

    if (!tenantId || !title || amount === undefined) {
      return error(res, 'tenantId, title, and amount are required', 400);
    }

    const value = Number(amount);
    if (!(value > 0)) {
      return error(res, 'amount must be greater than 0', 400);
    }

    const tenantUserDoc = await db.collection('users').doc(tenantId).get();
    if (!tenantUserDoc.exists || tenantUserDoc.data().pgId !== pgId) {
      return error(res, 'Tenant not found in your PG', 404);
    }

    const paymentRef = db.collection('customPayments').doc();
    const paymentData = {
      tenantId,
      pgId,
      title: String(title).trim(),
      amount: value,
      status: 'unpaid',
      paymentMethod: null,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      paidAt: null,
    };

    await paymentRef.set(paymentData);

    return success(res, { id: paymentRef.id, ...paymentData }, 201);
  } catch (err) {
    console.error('custom payment create error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
