import crypto from 'crypto';
import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { requireRole } from '../../../middleware/requireRole';
import { rateLimit, RATE_LIMITS } from '../../../middleware/rateLimit';
import { getFirestore } from '../../../lib/firebaseAdmin';
import { isRazorpayConfigured } from '../../../lib/razorpay';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    rateLimit(req, RATE_LIMITS.sensitive);
    const decoded = await verifyAuth(req);
    const user = await requireRole(decoded.uid, ['tenant']);
    const db = getFirestore();
    const pgId = user.pgId;
    const tenantId = decoded.uid;

    if (!isRazorpayConfigured()) {
      return error(res, 'Online payments are not configured on the server', 503);
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, month, year } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !month || !year) {
      return error(res, 'Missing payment verification fields', 400);
    }

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(body)
      .digest('hex');

    // Constant-time comparison to avoid leaking the signature via timing.
    const expectedBuf = Buffer.from(expectedSignature, 'utf8');
    const providedBuf = Buffer.from(String(razorpay_signature), 'utf8');
    const signatureValid =
      expectedBuf.length === providedBuf.length &&
      crypto.timingSafeEqual(expectedBuf, providedBuf);

    if (!signatureValid) {
      return error(res, 'Payment signature verification failed', 400);
    }

    const recordSnapshot = await db
      .collection('rentRecords')
      .where('tenantId', '==', tenantId)
      .where('pgId', '==', pgId)
      .where('month', '==', Number(month))
      .where('year', '==', Number(year))
      .limit(1)
      .get();

    if (recordSnapshot.empty) {
      return error(res, 'Rent record not found', 404);
    }

    const recordRef = recordSnapshot.docs[0].ref;
    const paidAt = new Date().toISOString();

    await recordRef.update({
      status: 'paid',
      paymentMethod: 'razorpay',
      paymentId: razorpay_payment_id,
      paidAt,
    });

    return success(res, {
      status: 'paid',
      paymentId: razorpay_payment_id,
      paidAt,
      month: Number(month),
      year: Number(year),
    });
  } catch (err) {
    console.error('verify-payment error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
