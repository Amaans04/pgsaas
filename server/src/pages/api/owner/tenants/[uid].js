import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../middleware/requireAdmin';
import { getFirestore } from '../../../../lib/firebaseAdmin';
import { computeRoomStatus } from '../../../../lib/room';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'DELETE') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireAdmin(decoded.uid);
    const db = getFirestore();
    const pgId = user.pgId;
    const tenantId = req.query.uid;

    if (!tenantId) {
      return error(res, 'tenant uid is required', 400);
    }

    await db.runTransaction(async (tx) => {
      const userRef = db.collection('users').doc(tenantId);
      const tenantRef = db.collection('tenants').doc(tenantId);

      const [userDoc, tenantDoc] = await Promise.all([tx.get(userRef), tx.get(tenantRef)]);

      if (!userDoc.exists || userDoc.data().role !== 'tenant') {
        throw Object.assign(new Error('Tenant not found'), { statusCode: 404 });
      }

      if (userDoc.data().pgId !== pgId) {
        throw Object.assign(new Error('Tenant not found in your PG'), { statusCode: 404 });
      }

      const tenant = tenantDoc.exists ? tenantDoc.data() : null;

      if (tenant?.roomId) {
        const roomRef = db.collection('rooms').doc(tenant.roomId);
        const roomDoc = await tx.get(roomRef);

        if (roomDoc.exists && roomDoc.data().pgId === pgId) {
          const room = roomDoc.data();
          const newOccupancy = Math.max((room.currentOccupancy || 0) - 1, 0);
          tx.update(roomRef, {
            currentOccupancy: newOccupancy,
            status: computeRoomStatus(newOccupancy, room.sharingCapacity),
          });
        }
      }

      tx.update(userRef, { pgId: null });
      tx.delete(tenantRef);
    });

    return success(res, { uid: tenantId, deleted: true });
  } catch (err) {
    console.error('delete tenant error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
