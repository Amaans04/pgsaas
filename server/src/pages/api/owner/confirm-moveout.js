import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { requireAdmin } from '../../../middleware/requireAdmin';
import { getFirestore } from '../../../lib/firebaseAdmin';
import { computeRoomStatus } from '../../../lib/room';

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

    const { tenantId } = req.body;

    if (!tenantId) {
      return error(res, 'tenantId is required', 400);
    }

    await db.runTransaction(async (tx) => {
      const tenantRef = db.collection('tenants').doc(tenantId);
      const tenantDoc = await tx.get(tenantRef);

      if (!tenantDoc.exists || tenantDoc.data().pgId !== pgId) {
        throw Object.assign(new Error('Tenant not found in your PG'), { statusCode: 404 });
      }

      const tenant = tenantDoc.data();

      if (tenant.status === 'moved_out') {
        throw Object.assign(new Error('Tenant has already moved out'), { statusCode: 400 });
      }

      let roomDoc = null;
      let roomRef = null;
      if (tenant.roomId) {
        roomRef = db.collection('rooms').doc(tenant.roomId);
        roomDoc = await tx.get(roomRef);
      }

      tx.update(tenantRef, {
        status: 'moved_out',
        moveOutDate: tenant.moveOutDate || new Date().toISOString(),
        roomId: null,
      });

      // Free the tenant so another PG can add them later
      tx.update(db.collection('users').doc(tenantId), { pgId: null });

      if (roomDoc?.exists) {
        const room = roomDoc.data();
        const newOccupancy = Math.max((room.currentOccupancy || 0) - 1, 0);
        tx.update(roomRef, {
          currentOccupancy: newOccupancy,
          status: computeRoomStatus(newOccupancy, room.sharingCapacity),
        });
      }
    });

    return success(res, { tenantId, status: 'moved_out' });
  } catch (err) {
    console.error('confirm moveout error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
