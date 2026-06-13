export function computeRoomStatus(currentOccupancy, sharingCapacity) {
  const occupancy = Number(currentOccupancy) || 0;
  const capacity = Number(sharingCapacity) || 1;
  if (occupancy <= 0) return 'vacant';
  if (occupancy >= capacity) return 'full';
  return 'partial';
}

/** Normalize legacy room docs (houseNumber, rent, numberOfGuests, occupied). */
export function normalizeRoom(room) {
  const sharingCapacity = Number(room.sharingCapacity ?? room.numberOfGuests ?? 1) || 1;
  const rentAmount = Number(room.rentAmount ?? room.rent ?? 0);
  const currentOccupancy = Number(room.currentOccupancy ?? 0);
  const roomNumber = String(room.roomNumber ?? room.houseNumber ?? '').trim();

  return {
    ...room,
    roomNumber,
    sharingCapacity,
    rentAmount,
    currentOccupancy,
    status: computeRoomStatus(currentOccupancy, sharingCapacity),
  };
}

export async function loadRoomsForPg(db, pgId, { syncToFirestore = false } = {}) {
  const [roomsSnap, tenantsSnap] = await Promise.all([
    db.collection('rooms').where('pgId', '==', pgId).get(),
    db.collection('tenants').where('pgId', '==', pgId).get(),
  ]);

  const occupancyByRoom = {};
  tenantsSnap.docs.forEach((doc) => {
    const tenant = doc.data();
    if (tenant.roomId && ['active', 'notice_period'].includes(tenant.status)) {
      occupancyByRoom[tenant.roomId] = (occupancyByRoom[tenant.roomId] || 0) + 1;
    }
  });

  const batch = syncToFirestore ? db.batch() : null;
  let pendingWrites = 0;

  const rooms = roomsSnap.docs.map((doc) => {
    const raw = { ...doc.data(), id: doc.id };
    const normalized = normalizeRoom(raw);
    const actualOccupancy = occupancyByRoom[doc.id] ?? 0;
    const status = computeRoomStatus(actualOccupancy, normalized.sharingCapacity);

    if (batch) {
      const updates = {};
      if (doc.data().sharingCapacity == null) updates.sharingCapacity = normalized.sharingCapacity;
      if (doc.data().rentAmount == null && normalized.rentAmount) updates.rentAmount = normalized.rentAmount;
      if (doc.data().roomNumber == null && normalized.roomNumber) updates.roomNumber = normalized.roomNumber;
      if ((doc.data().currentOccupancy || 0) !== actualOccupancy) {
        updates.currentOccupancy = actualOccupancy;
      }
      if (doc.data().status !== status) updates.status = status;
      if (Object.keys(updates).length > 0) {
        batch.update(doc.ref, updates);
        pendingWrites += 1;
      }
    }

    return {
      ...normalized,
      id: doc.id,
      currentOccupancy: actualOccupancy,
      status,
    };
  });

  if (batch && pendingWrites > 0) {
    await batch.commit();
  }

  rooms.sort((a, b) =>
    String(a.roomNumber).localeCompare(String(b.roomNumber), undefined, { numeric: true })
  );

  return rooms;
}

export async function isRoomNumberTaken(db, pgId, roomNumber, excludeRoomId = null) {
  const trimmed = String(roomNumber).trim();
  if (!trimmed) return false;

  const snapshot = await db.collection('rooms').where('pgId', '==', pgId).get();
  return snapshot.docs.some((doc) => {
    if (excludeRoomId && doc.id === String(excludeRoomId)) return false;
    return normalizeRoom(doc.data()).roomNumber === trimmed;
  });
}

export async function countActiveTenantsInRoom(db, roomId) {
  const snapshot = await db.collection('tenants').where('roomId', '==', roomId).get();
  return snapshot.docs.filter((doc) =>
    ['active', 'notice_period'].includes(doc.data().status)
  ).length;
}

export async function getActiveTenantsInRoom(db, roomId, pgId) {
  const snapshot = await db.collection('tenants').where('roomId', '==', roomId).get();
  const members = [];

  for (const doc of snapshot.docs) {
    const tenant = doc.data();
    if (!['active', 'notice_period'].includes(tenant.status) || tenant.pgId !== pgId) {
      continue;
    }
    const userDoc = await db.collection('users').doc(doc.id).get();
    const user = userDoc.exists ? userDoc.data() : {};
    members.push({
      uid: doc.id,
      name: user.name || 'Unknown',
      email: user.email || '',
      phone: user.phone || '',
      status: tenant.status,
      moveInDate: tenant.moveInDate || null,
    });
  }

  members.sort((a, b) => a.name.localeCompare(b.name));
  return members;
}

export function applyRoomOccupancyUpdate(tx, roomRef, roomDoc, delta) {
  const room = roomDoc.data();
  const capacity = room.sharingCapacity ?? room.numberOfGuests ?? 1;
  const newOccupancy = Math.max((room.currentOccupancy || 0) + delta, 0);
  tx.update(roomRef, {
    currentOccupancy: newOccupancy,
    status: computeRoomStatus(newOccupancy, capacity),
  });
  return newOccupancy;
}
