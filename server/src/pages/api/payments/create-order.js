import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { requireRole } from '../../../middleware/requireRole';
import { rateLimit, RATE_LIMITS } from '../../../middleware/rateLimit';
import { getFirestore } from '../../../lib/firebaseAdmin';
import { getRazorpay, isDevPaymentsEnabled, isRazorpayConfigured } from '../../../lib/razorpay';
import { computeRentDueDate } from '../../../lib/rentDue';

async function upsertRentRecord(db, { tenantId, pgId, roomId, month, year, amount, dueDate, existingRecord }) {
  const recordData = {
    amount,
    dueDate,
    status: 'unpaid',
    paymentMethod: null,
    paymentId: null,
    paidAt: null,
  };

  if (!existingRecord.empty) {
    const existing = existingRecord.docs[0].data();
    await existingRecord.docs[0].ref.update({
      amount,
      dueDate: dueDate || existing.dueDate,
      status: existing.status === 'paid' ? 'paid' : 'unpaid',
    });
    return;
  }

  await db.collection('rentRecords').add({
    tenantId,
    pgId,
    roomId,
    month: Number(month),
    year: Number(year),
    ...recordData,
  });
}

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

    const { month, year } = req.body;

    if (!month || !year) {
      return error(res, 'month and year are required', 400);
    }

    const tenantDoc = await db.collection('tenants').doc(tenantId).get();
    if (!tenantDoc.exists) {
      return error(res, 'Tenant record not found', 404);
    }

    const tenantData = tenantDoc.data();

    if (tenantData.status === 'moved_out') {
      return error(res, 'You have moved out of this PG', 400);
    }

    const roomId = tenantData.roomId;
    if (!roomId) {
      return error(res, 'No room assigned. Contact your PG owner.', 400);
    }

    const roomDoc = await db.collection('rooms').doc(roomId).get();

    if (!roomDoc.exists) {
      return error(res, 'Room not found', 404);
    }

    const amount = roomDoc.data().rentAmount;

    if (!amount || amount <= 0) {
      return error(res, 'Invalid rent amount configured for your room', 400);
    }

    const existingRecord = await db
      .collection('rentRecords')
      .where('tenantId', '==', tenantId)
      .where('pgId', '==', pgId)
      .where('month', '==', Number(month))
      .where('year', '==', Number(year))
      .limit(1)
      .get();

    if (!existingRecord.empty && existingRecord.docs[0].data().status === 'paid') {
      return error(res, 'Rent already paid for this month', 400);
    }

    const pgDoc = await db.collection('pgs').doc(pgId).get();
    const rentDueDay = pgDoc.exists ? pgDoc.data().rentDueDate ?? 5 : 5;
    const dueDate =
      existingRecord.empty || !existingRecord.docs[0].data().dueDate
        ? computeRentDueDate(month, year, rentDueDay)
        : existingRecord.docs[0].data().dueDate;

    if (!isRazorpayConfigured()) {
      if (isDevPaymentsEnabled()) {
        await upsertRentRecord(db, {
          tenantId,
          pgId,
          roomId,
          month,
          year,
          amount,
          dueDate,
          existingRecord,
        });

        return success(res, {
          devMode: true,
          amount,
          currency: 'INR',
          month: Number(month),
          year: Number(year),
        });
      }

      return error(
        res,
        'Online payments are not configured yet. Pay rent in cash to your PG owner.',
        503
      );
    }

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: `rent_${tenantId}_${month}_${year}`,
      notes: {
        tenantId,
        pgId,
        month: String(month),
        year: String(year),
      },
    });

    await upsertRentRecord(db, {
      tenantId,
      pgId,
      roomId,
      month,
      year,
      amount,
      dueDate,
      existingRecord,
    });

    return success(res, {
      orderId: order.id,
      amount,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error('create-order error:', err);
    if (err.code === 'RAZORPAY_NOT_CONFIGURED') {
      return error(
        res,
        'Online payments are not configured yet. Pay rent in cash to your PG owner.',
        503
      );
    }
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
