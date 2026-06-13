import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../middleware/requireAdmin';
import { getFirestore } from '../../../../lib/firebaseAdmin';
import { getActiveTenantsInRoom, normalizeRoom } from '../../../../lib/room';

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
    const roomId = req.query.roomId;

    if (!roomId) {
      return error(res, 'roomId is required', 400);
    }

    const roomDoc = await db.collection('rooms').doc(String(roomId)).get();
    if (!roomDoc.exists || roomDoc.data().pgId !== pgId) {
      return error(res, 'Room not found in your PG', 404);
    }

    const room = normalizeRoom({ ...roomDoc.data(), id: roomDoc.id });
    const members = await getActiveTenantsInRoom(db, String(roomId), pgId);

    room.currentOccupancy = members.length;
    room.status =
      members.length <= 0
        ? 'vacant'
        : members.length >= room.sharingCapacity
          ? 'full'
          : 'partial';

    const usersSnap = await db.collection('users').where('role', '==', 'tenant').get();
    const assignable = [];

    for (const doc of usersSnap.docs) {
      const data = doc.data();
      if (data.pgId && data.pgId !== pgId) continue;

      const tenantDoc = await db.collection('tenants').doc(doc.id).get();
      const tenant = tenantDoc.exists ? tenantDoc.data() : null;

      if (tenant && ['active', 'notice_period'].includes(tenant.status) && tenant.roomId) {
        continue;
      }

      assignable.push({
        uid: doc.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
    }

    assignable.sort((a, b) => a.name.localeCompare(b.name));

    const otherRoomsSnap = await db.collection('rooms').where('pgId', '==', pgId).get();
    const otherRooms = otherRoomsSnap.docs
      .filter((doc) => doc.id !== String(roomId))
      .map((doc) => {
        const r = normalizeRoom({ ...doc.data(), id: doc.id });
        return {
          id: doc.id,
          roomNumber: r.roomNumber,
          sharingCapacity: r.sharingCapacity,
          currentOccupancy: r.currentOccupancy,
          available: (r.currentOccupancy || 0) < r.sharingCapacity,
        };
      })
      .sort((a, b) =>
        String(a.roomNumber).localeCompare(String(b.roomNumber), undefined, { numeric: true })
      );

    return success(res, { room, members, assignable, otherRooms });
  } catch (err) {
    console.error('room detail error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
