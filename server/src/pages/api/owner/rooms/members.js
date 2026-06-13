import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../middleware/requireAdmin';
import { getFirestore } from '../../../../lib/firebaseAdmin';
import { applyRoomOccupancyUpdate } from '../../../../lib/room';

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

    const { action, roomId, tenantId, targetRoomId } = req.body;

    if (!action || !roomId) {
      return error(res, 'action and roomId are required', 400);
    }

    if (action === 'add') {
      if (!tenantId) return error(res, 'tenantId is required', 400);
      await addMember(db, pgId, roomId, tenantId);
      return success(res, { action, tenantId, roomId });
    }

    if (action === 'remove') {
      if (!tenantId) return error(res, 'tenantId is required', 400);
      await removeMember(db, pgId, roomId, tenantId);
      return success(res, { action, tenantId, roomId });
    }

    if (action === 'move') {
      if (!tenantId || !targetRoomId) {
        return error(res, 'tenantId and targetRoomId are required', 400);
      }
      await moveMember(db, pgId, roomId, tenantId, targetRoomId);
      return success(res, { action, tenantId, roomId, targetRoomId });
    }

    return error(res, 'Invalid action. Use add, remove, or move', 400);
  } catch (err) {
    console.error('room members error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}

async function addMember(db, pgId, roomId, userId) {
  await db.runTransaction(async (tx) => {
    const userRef = db.collection('users').doc(userId);
    const roomRef = db.collection('rooms').doc(roomId);
    const tenantRef = db.collection('tenants').doc(userId);

    const [userDoc, roomDoc, tenantDoc] = await Promise.all([
      tx.get(userRef),
      tx.get(roomRef),
      tx.get(tenantRef),
    ]);

    if (!userDoc.exists || userDoc.data().role !== 'tenant') {
      throw Object.assign(new Error('Tenant not found'), { statusCode: 404 });
    }

    if (userDoc.data().pgId && userDoc.data().pgId !== pgId) {
      throw Object.assign(new Error('Tenant belongs to another PG'), { statusCode: 400 });
    }

    if (tenantDoc.exists && ['active', 'notice_period'].includes(tenantDoc.data().status) && tenantDoc.data().roomId) {
      throw Object.assign(new Error('Tenant is already assigned to a room'), { statusCode: 400 });
    }

    if (!roomDoc.exists || roomDoc.data().pgId !== pgId) {
      throw Object.assign(new Error('Room not found'), { statusCode: 404 });
    }

    const room = roomDoc.data();
    const capacity = room.sharingCapacity ?? room.numberOfGuests ?? 1;
    if ((room.currentOccupancy || 0) >= capacity) {
      throw Object.assign(new Error('Room is at full capacity'), { statusCode: 400 });
    }

    const now = new Date().toISOString();
    tx.update(userRef, { pgId });
    tx.set(tenantRef, {
      pgId,
      roomId,
      moveInDate: tenantDoc.exists ? tenantDoc.data().moveInDate || now : now,
      noticeGiven: false,
      noticeDate: null,
      moveOutDate: null,
      status: 'active',
    });
    applyRoomOccupancyUpdate(tx, roomRef, roomDoc, 1);
  });
}

async function removeMember(db, pgId, roomId, tenantId) {
  await db.runTransaction(async (tx) => {
    const tenantRef = db.collection('tenants').doc(tenantId);
    const roomRef = db.collection('rooms').doc(roomId);
    const userRef = db.collection('users').doc(tenantId);

    const [tenantDoc, roomDoc, userDoc] = await Promise.all([
      tx.get(tenantRef),
      tx.get(roomRef),
      tx.get(userRef),
    ]);

    if (!tenantDoc.exists || tenantDoc.data().pgId !== pgId || tenantDoc.data().roomId !== roomId) {
      throw Object.assign(new Error('Tenant is not in this room'), { statusCode: 404 });
    }

    if (!roomDoc.exists || roomDoc.data().pgId !== pgId) {
      throw Object.assign(new Error('Room not found'), { statusCode: 404 });
    }

    tx.update(tenantRef, { roomId: null, noticeGiven: false, noticeDate: null, moveOutDate: null });
    tx.update(userRef, { pgId });
    applyRoomOccupancyUpdate(tx, roomRef, roomDoc, -1);
  });
}

async function moveMember(db, pgId, sourceRoomId, tenantId, targetRoomId) {
  if (sourceRoomId === targetRoomId) {
    throw Object.assign(new Error('Target room must be different'), { statusCode: 400 });
  }

  await db.runTransaction(async (tx) => {
    const tenantRef = db.collection('tenants').doc(tenantId);
    const sourceRef = db.collection('rooms').doc(sourceRoomId);
    const targetRef = db.collection('rooms').doc(targetRoomId);

    const [tenantDoc, sourceDoc, targetDoc] = await Promise.all([
      tx.get(tenantRef),
      tx.get(sourceRef),
      tx.get(targetRef),
    ]);

    if (!tenantDoc.exists || tenantDoc.data().roomId !== sourceRoomId || tenantDoc.data().pgId !== pgId) {
      throw Object.assign(new Error('Tenant is not in the source room'), { statusCode: 404 });
    }

    if (!targetDoc.exists || targetDoc.data().pgId !== pgId) {
      throw Object.assign(new Error('Target room not found'), { statusCode: 404 });
    }

    const target = targetDoc.data();
    const targetCapacity = target.sharingCapacity ?? target.numberOfGuests ?? 1;
    if ((target.currentOccupancy || 0) >= targetCapacity) {
      throw Object.assign(new Error('Target room is full'), { statusCode: 400 });
    }

    tx.update(tenantRef, { roomId: targetRoomId });
    applyRoomOccupancyUpdate(tx, sourceRef, sourceDoc, -1);
    applyRoomOccupancyUpdate(tx, targetRef, targetDoc, 1);
  });
}
