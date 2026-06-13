import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../middleware/requireAdmin';
import { getFirestore } from '../../../../lib/firebaseAdmin';
import { computeRoomStatus } from '../../../../lib/room';

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

    const { userId, roomId } = req.body;

    if (!userId || !roomId) {
      return error(res, 'userId and roomId are required', 400);
    }

    // Transaction prevents over-assignment when two assignments race
    const result = await db.runTransaction(async (tx) => {
      const userRef = db.collection('users').doc(userId);
      const roomRef = db.collection('rooms').doc(roomId);
      const tenantRef = db.collection('tenants').doc(userId);

      const [targetUserDoc, roomDoc, tenantDoc] = await Promise.all([
        tx.get(userRef),
        tx.get(roomRef),
        tx.get(tenantRef),
      ]);

      if (!targetUserDoc.exists || targetUserDoc.data().role !== 'tenant') {
        throw Object.assign(new Error('Tenant user not found'), { statusCode: 404 });
      }

      const targetUser = targetUserDoc.data();
      if (targetUser.pgId && targetUser.pgId !== pgId) {
        throw Object.assign(new Error('This tenant is already assigned to another PG'), { statusCode: 400 });
      }

      if (tenantDoc.exists && ['active', 'notice_period'].includes(tenantDoc.data().status)) {
        throw Object.assign(new Error('This tenant already has an active room assignment'), { statusCode: 400 });
      }

      if (!roomDoc.exists || roomDoc.data().pgId !== pgId) {
        throw Object.assign(new Error('Room not found in your PG'), { statusCode: 404 });
      }

      const room = roomDoc.data();
      const occupancy = room.currentOccupancy || 0;

      if (occupancy >= room.sharingCapacity) {
        throw Object.assign(
          new Error(`Room ${room.roomNumber} is full (${occupancy}/${room.sharingCapacity})`),
          { statusCode: 400 }
        );
      }

      const newOccupancy = occupancy + 1;
      const now = new Date().toISOString();

      tx.update(userRef, { pgId });
      tx.set(tenantRef, {
        pgId,
        roomId,
        moveInDate: now,
        noticeGiven: false,
        noticeDate: null,
        moveOutDate: null,
        status: 'active',
      });
      tx.update(roomRef, {
        currentOccupancy: newOccupancy,
        status: computeRoomStatus(newOccupancy, room.sharingCapacity),
      });

      return { roomNumber: room.roomNumber, currentOccupancy: newOccupancy };
    });

    return success(res, { userId, roomId, ...result });
  } catch (err) {
    console.error('add tenant error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
