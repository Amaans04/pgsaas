import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { requireRole } from '../../../middleware/requireRole';
import { isAdminEmail } from '../../../config/admins';
import { getFirestore } from '../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireRole(decoded.uid, ['owner', 'tenant']);
    const db = getFirestore();

    const { moveOutDate, tenantId } = req.body;

    if (!moveOutDate) {
      return error(res, 'moveOutDate is required', 400);
    }

    if (new Date(moveOutDate) <= new Date()) {
      return error(res, 'moveOutDate must be in the future', 400);
    }

    let targetUid;

    if (user.role === 'owner') {
      if (!isAdminEmail((user.email || '').toLowerCase(), user.pgId)) {
        return error(res, 'Admin access denied for this account', 403);
      }
      if (!tenantId) {
        return error(res, 'tenantId is required when an owner submits notice', 400);
      }
      targetUid = tenantId;
    } else {
      targetUid = decoded.uid;
    }

    const tenantRef = db.collection('tenants').doc(targetUid);
    const tenantDoc = await tenantRef.get();

    if (!tenantDoc.exists) {
      return error(res, 'Tenant record not found', 404);
    }

    const tenant = tenantDoc.data();

    if (user.role === 'owner' && tenant.pgId !== user.pgId) {
      return error(res, 'Tenant not found in your PG', 404);
    }

    if (tenant.status !== 'active') {
      return error(res, `Cannot give notice — tenant status is "${tenant.status}"`, 400);
    }

    const noticeDate = new Date().toISOString();
    await tenantRef.update({
      noticeGiven: true,
      noticeDate,
      moveOutDate,
      status: 'notice_period',
    });

    return success(res, { tenantId: targetUid, noticeDate, moveOutDate, status: 'notice_period' });
  } catch (err) {
    console.error('notice error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
