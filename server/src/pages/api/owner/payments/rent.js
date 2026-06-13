import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../middleware/requireAdmin';
import { getFirestore } from '../../../../lib/firebaseAdmin';
import { computeRentDueDate } from '../../../../lib/rentDue';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'PUT') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireAdmin(decoded.uid);
    const db = getFirestore();
    const pgId = user.pgId;

    const { tenantId, month, year, amount, dueDate, status, paymentMethod } = req.body;

    if (!tenantId || !month || !year) {
      return error(res, 'tenantId, month, and year are required', 400);
    }

    const rentAmount = Number(amount);
    if (!(rentAmount > 0)) {
      return error(res, 'amount must be greater than 0', 400);
    }

    if (!['paid', 'unpaid'].includes(status)) {
      return error(res, 'status must be paid or unpaid', 400);
    }

    const tenantDoc = await db.collection('tenants').doc(String(tenantId)).get();
    if (!tenantDoc.exists || tenantDoc.data().pgId !== pgId) {
      return error(res, 'Tenant not found in your PG', 404);
    }

    const tenant = tenantDoc.data();
    if (!['active', 'notice_period'].includes(tenant.status)) {
      return error(res, 'Cannot update rent for inactive tenants', 400);
    }

    const pgDoc = await db.collection('pgs').doc(pgId).get();
    const rentDueDay = pgDoc.exists ? pgDoc.data().rentDueDate : 5;
    const resolvedDueDate = dueDate || computeRentDueDate(month, year, rentDueDay);

    const existing = await db
      .collection('rentRecords')
      .where('tenantId', '==', String(tenantId))
      .where('pgId', '==', pgId)
      .where('month', '==', Number(month))
      .where('year', '==', Number(year))
      .limit(1)
      .get();

    const updates = {
      tenantId: String(tenantId),
      pgId,
      roomId: tenant.roomId || null,
      month: Number(month),
      year: Number(year),
      amount: rentAmount,
      dueDate: resolvedDueDate,
      status,
    };

    if (status === 'paid') {
      const method = paymentMethod || 'cash';
      updates.paymentMethod = method;
      updates.paidAt = existing.empty
        ? new Date().toISOString()
        : existing.docs[0].data().paidAt || new Date().toISOString();
      if (!existing.empty && existing.docs[0].data().paymentId) {
        updates.paymentId = existing.docs[0].data().paymentId;
      } else if (method === 'cash') {
        updates.paymentId = `cash_${Date.now()}`;
      }
    } else {
      updates.paymentMethod = null;
      updates.paymentId = null;
      updates.paidAt = null;
    }

    let recordId;
    if (existing.empty) {
      const ref = await db.collection('rentRecords').add(updates);
      recordId = ref.id;
    } else {
      recordId = existing.docs[0].id;
      await existing.docs[0].ref.update(updates);
    }

    return success(res, { id: recordId, ...updates });
  } catch (err) {
    console.error('owner rent payment update error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
