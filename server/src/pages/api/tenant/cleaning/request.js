import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireRole } from '../../../../middleware/requireRole';
import { getFirestore } from '../../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireRole(decoded.uid, ['tenant']);
    const db = getFirestore();
    const pgId = user.pgId;
    const tenantId = decoded.uid;

    if (!pgId) {
      return error(res, 'You are not assigned to a PG yet. Ask your PG owner to add you.', 400);
    }

    const tenantDoc = await db.collection('tenants').doc(tenantId).get();
    if (!tenantDoc.exists) {
      return error(res, 'Tenant record not found', 404);
    }

    const tenant = tenantDoc.data();
    if (!['active', 'notice_period'].includes(tenant.status)) {
      return error(res, 'Cannot request cleaning in your current status', 400);
    }

    const userDoc = await db.collection('users').doc(tenantId).get();
    const tenantName = userDoc.exists ? userDoc.data().name : 'Tenant';

    let roomNumber = null;
    if (tenant.roomId) {
      const roomDoc = await db.collection('rooms').doc(tenant.roomId).get();
      if (roomDoc.exists) {
        roomNumber = roomDoc.data().roomNumber || roomDoc.data().houseNumber || null;
      }
    }

    const existingSnap = await db.collection('cleaningRequests').where('pgId', '==', pgId).get();
    const hasPending = existingSnap.docs.some(
      (doc) => doc.data().tenantId === tenantId && doc.data().status === 'pending'
    );

    if (hasPending) {
      return error(res, 'You already have a pending cleaning request. Staff will attend soon.', 400);
    }

    const now = new Date().toISOString();
    const ref = db.collection('cleaningRequests').doc();
    const requestData = {
      tenantId,
      pgId,
      roomId: tenant.roomId || null,
      roomNumber,
      tenantName,
      status: 'pending',
      createdAt: now,
      resolvedAt: null,
      resolvedBy: null,
    };

    await ref.set(requestData);

    return success(res, { id: ref.id, ...requestData }, 201);
  } catch (err) {
    console.error('cleaning request error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
