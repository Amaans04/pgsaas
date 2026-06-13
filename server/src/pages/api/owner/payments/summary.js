import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../middleware/requireAdmin';
import { getFirestore } from '../../../../lib/firebaseAdmin';
import { computeRentDueDate } from '../../../../lib/rentDue';
import { loadTenantsForPg } from '../../../../lib/tenants';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireAdmin(decoded.uid);
    const db = getFirestore();
    const pgId = user.pgId;

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const [pgDoc, activeTenants, rentSnapshot] = await Promise.all([
      db.collection('pgs').doc(pgId).get(),
      loadTenantsForPg(db, pgId, { statuses: ['active', 'notice_period'] }),
      db.collection('rentRecords')
        .where('pgId', '==', pgId)
        .where('month', '==', month)
        .where('year', '==', year)
        .get(),
    ]);

    const rentDueDay = pgDoc.exists ? pgDoc.data().rentDueDate ?? 5 : 5;

    const recordByTenant = {};
    rentSnapshot.docs.forEach((doc) => {
      recordByTenant[doc.data().tenantId] = { id: doc.id, ...doc.data() };
    });

    const tenantBreakdown = activeTenants.map((tenant) => {
      const record = recordByTenant[tenant.uid];
      const defaultAmount = tenant.rentAmount || 0;
      const amount = record?.amount ?? defaultAmount;
      const dueDate = record?.dueDate ?? computeRentDueDate(month, year, rentDueDay);
      const status = record?.status ?? 'unpaid';

      return {
        recordId: record?.id || null,
        tenantId: tenant.uid,
        name: tenant.name,
        roomNumber: tenant.roomNumber || null,
        amount,
        dueDate,
        status,
        paymentMethod: record?.paymentMethod || null,
        paidAt: record?.paidAt || null,
      };
    });

    tenantBreakdown.sort((a, b) => a.name.localeCompare(b.name));

    const totalDue = tenantBreakdown.reduce((sum, t) => sum + t.amount, 0);
    const totalPaid = tenantBreakdown
      .filter((t) => t.status === 'paid')
      .reduce((sum, t) => sum + t.amount, 0);

    return success(res, {
      month,
      year,
      rentDueDay,
      totalDue,
      totalPaid,
      totalPending: totalDue - totalPaid,
      tenantBreakdown,
    });
  } catch (err) {
    console.error('payments summary error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
