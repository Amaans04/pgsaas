import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../middleware/requireAdmin';
import { requireStaffOrAdmin } from '../../../../middleware/requireStaffOrAdmin';
import { getFirestore } from '../../../../lib/firebaseAdmin';
import {
  loadRoomsForPg,
  countActiveTenantsInRoom,
  computeRoomStatus,
  isRoomNumberTaken,
} from '../../../../lib/room';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    const decoded = await verifyAuth(req);
    const db = getFirestore();

    if (req.method === 'GET') {
      const user = await requireStaffOrAdmin(decoded.uid);
      const sync = user.role === 'owner';
      const rooms = await loadRoomsForPg(db, user.pgId, { syncToFirestore: sync });
      return success(res, rooms);
    }

    if (req.method === 'POST') {
      const user = await requireAdmin(decoded.uid);
      const pgId = user.pgId;

      if (!pgId) {
        return error(res, 'PG not found for this owner', 404);
      }

      const { roomNumber, roomType, sharingCapacity, rentAmount } = req.body;

      if (!roomNumber || sharingCapacity === undefined || rentAmount === undefined) {
        return error(res, 'roomNumber, sharingCapacity, and rentAmount are required', 400);
      }

      const capacity = Number(sharingCapacity);
      if (!Number.isInteger(capacity) || capacity < 1) {
        return error(res, 'sharingCapacity must be a whole number of at least 1', 400);
      }

      const rent = Number(rentAmount);
      if (!(rent > 0)) {
        return error(res, 'rentAmount must be greater than 0', 400);
      }

      const trimmedNumber = String(roomNumber).trim();
      if (await isRoomNumberTaken(db, pgId, trimmedNumber)) {
        return error(res, `Room number ${trimmedNumber} is already used`, 400);
      }

      const roomRef = db.collection('rooms').doc();
      const roomData = {
        pgId,
        roomNumber: trimmedNumber,
        roomType: roomType || null,
        sharingCapacity: capacity,
        currentOccupancy: 0,
        rentAmount: rent,
        status: 'vacant',
      };

      await roomRef.set(roomData);
      return success(res, { id: roomRef.id, ...roomData }, 201);
    }

    if (req.method === 'PUT') {
      const user = await requireAdmin(decoded.uid);
      const pgId = user.pgId;
      const roomId = req.query.roomId;

      if (!roomId) {
        return error(res, 'roomId is required', 400);
      }

      const { roomNumber, roomType, sharingCapacity, rentAmount } = req.body;

      if (!roomNumber || sharingCapacity === undefined || rentAmount === undefined) {
        return error(res, 'roomNumber, sharingCapacity, and rentAmount are required', 400);
      }

      const capacity = Number(sharingCapacity);
      if (!Number.isInteger(capacity) || capacity < 1) {
        return error(res, 'sharingCapacity must be a whole number of at least 1', 400);
      }

      const rent = Number(rentAmount);
      if (!(rent > 0)) {
        return error(res, 'rentAmount must be greater than 0', 400);
      }

      const roomRef = db.collection('rooms').doc(String(roomId));
      const roomDoc = await roomRef.get();

      if (!roomDoc.exists || roomDoc.data().pgId !== pgId) {
        return error(res, 'Room not found in your PG', 404);
      }

      const occupancy = await countActiveTenantsInRoom(db, String(roomId));
      if (capacity < occupancy) {
        return error(
          res,
          `Sharing capacity cannot be less than current occupancy (${occupancy} tenant(s) assigned)`,
          400
        );
      }

      const trimmedNumber = String(roomNumber).trim();
      if (await isRoomNumberTaken(db, pgId, trimmedNumber, String(roomId))) {
        return error(res, `Room number ${trimmedNumber} is already used`, 400);
      }

      const status = computeRoomStatus(occupancy, capacity);
      const updates = {
        roomNumber: trimmedNumber,
        roomType: roomType || null,
        sharingCapacity: capacity,
        rentAmount: rent,
        currentOccupancy: occupancy,
        status,
      };

      await roomRef.update(updates);
      return success(res, { id: roomId, ...updates });
    }

    if (req.method === 'DELETE') {
      const user = await requireAdmin(decoded.uid);
      const roomId = req.query.roomId;

      if (!roomId) {
        return error(res, 'roomId is required', 400);
      }

      const roomRef = db.collection('rooms').doc(String(roomId));
      const roomDoc = await roomRef.get();

      if (!roomDoc.exists || roomDoc.data().pgId !== user.pgId) {
        return error(res, 'Room not found in your PG', 404);
      }

      const assignedCount = await countActiveTenantsInRoom(db, String(roomId));
      if (assignedCount > 0) {
        const room = roomDoc.data();
        return error(
          res,
          `Cannot delete room ${room.roomNumber || room.houseNumber} — ${assignedCount} tenant(s) still assigned. Remove them first.`,
          400
        );
      }

      await roomRef.delete();
      return success(res, { roomId, deleted: true });
    }

    return error(res, 'Method not allowed', 405);
  } catch (err) {
    console.error('owner rooms error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
