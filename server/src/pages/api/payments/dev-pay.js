import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { requireRole } from '../../../middleware/requireRole';
import { rateLimit, RATE_LIMITS } from '../../../middleware/rateLimit';
import { getFirestore } from '../../../lib/firebaseAdmin';
import { isDevPaymentsEnabled } from '../../../lib/razorpay';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    if (!isDevPaymentsEnabled()) {
      return error(res, 'Dev payments are only available in local development without Razorpay keys', 403);
    }

    rateLimit(req, RATE_LIMITS.sensitive);
    const decoded = await verifyAuth(req);
    const user = await requireRole(decoded.uid, ['tenant']);
    const db = getFirestore();
    const { month, year } = req.body;

    if (!month || !year) {
      return error(res, 'month and year are required', 400);
    }

    const recordSnapshot = await db
      .collection('rentRecords')
      .where('tenantId', '==', decoded.uid)
      .where('pgId', '==', user.pgId)
      .where('month', '==', Number(month))
      .where('year', '==', Number(year))
      .limit(1)
      .get();

    if (recordSnapshot.empty) {
      return error(res, 'Rent record not found. Click Pay This Month first.', 404);
    }

    const record = recordSnapshot.docs[0];
    if (record.data().status === 'paid') {
      return error(res, 'Rent already paid for this month', 400);
    }

    const paidAt = new Date().toISOString();
    const paymentId = `dev_${record.id.slice(0, 8)}_${Date.now()}`;

    await record.ref.update({
      status: 'paid',
      paymentMethod: 'dev',
      paymentId,
      paidAt,
    });

    return success(res, {
      status: 'paid',
      paymentId,
      paidAt,
      month: Number(month),
      year: Number(year),
    });
  } catch (err) {
    console.error('dev-pay error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
