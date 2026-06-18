import { getAuth, getFirestore } from './firebaseAdmin';
import { computeRoomStatus } from './room';

async function deleteDocsInBatches(db, docs) {
  if (docs.length === 0) return;
  let batch = db.batch();
  let ops = 0;
  for (const doc of docs) {
    batch.delete(doc.ref);
    ops += 1;
    if (ops >= 450) {
      await batch.commit();
      batch = db.batch();
      ops = 0;
    }
  }
  if (ops > 0) await batch.commit();
}

async function queryByField(db, collection, field, value) {
  const snapshot = await db.collection(collection).where(field, '==', value).get();
  return snapshot.docs;
}

async function freeTenantRoom(db, tenantData, pgId) {
  if (!tenantData?.roomId) return;
  const roomRef = db.collection('rooms').doc(tenantData.roomId);
  const roomDoc = await roomRef.get();
  if (!roomDoc.exists || roomDoc.data().pgId !== pgId) return;
  const room = roomDoc.data();
  const newOccupancy = Math.max((room.currentOccupancy || 0) - 1, 0);
  await roomRef.update({
    currentOccupancy: newOccupancy,
    status: computeRoomStatus(newOccupancy, room.sharingCapacity),
  });
}

/**
 * Permanently erase Firestore data for the authenticated user.
 * Firebase Auth deletion is performed on the client via user.delete().
 */
export async function deleteUserAccountData(uid) {
  const db = getFirestore();
  const userRef = db.collection('users').doc(uid);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    return { role: null, deleted: true };
  }

  const userData = userDoc.data();
  const role = userData.role;

  if (role === 'tenant') {
    const tenantRef = db.collection('tenants').doc(uid);
    const tenantDoc = await tenantRef.get();
    const tenantData = tenantDoc.exists ? tenantDoc.data() : null;
    const pgId = userData.pgId;

    if (tenantData && pgId) {
      await freeTenantRoom(db, tenantData, pgId);
    }

    const [
      documents,
      complaints,
      cleaningRequests,
      rentRecords,
      customPayments,
      refreshTokens,
    ] = await Promise.all([
      queryByField(db, 'documents', 'userId', uid),
      queryByField(db, 'complaints', 'tenantId', uid),
      queryByField(db, 'cleaningRequests', 'tenantId', uid),
      queryByField(db, 'rentRecords', 'tenantId', uid),
      queryByField(db, 'customPayments', 'tenantId', uid),
      queryByField(db, 'refreshTokens', 'uid', uid),
    ]);

    await deleteDocsInBatches(db, [
      ...documents,
      ...complaints,
      ...cleaningRequests,
      ...rentRecords,
      ...customPayments,
      ...refreshTokens,
    ]);

    if (tenantDoc.exists) await tenantRef.delete();
    await userRef.delete();
    return { role, deleted: true };
  }

  if (role === 'staff') {
    const refreshTokens = await queryByField(db, 'refreshTokens', 'uid', uid);
    await deleteDocsInBatches(db, refreshTokens);
    await userRef.delete();
    return { role, deleted: true };
  }

  if (role === 'owner') {
    const pgId = userData.pgId;
    const refreshTokens = await queryByField(db, 'refreshTokens', 'uid', uid);
    const documents = await queryByField(db, 'documents', 'userId', uid);
    const tenantRef = db.collection('tenants').doc(uid);
    const tenantDoc = await tenantRef.get();

    await deleteDocsInBatches(db, [...refreshTokens, ...documents]);

    if (tenantDoc.exists) await tenantRef.delete();

    if (pgId) {
      const pgRef = db.collection('pgs').doc(pgId);
      const pgDoc = await pgRef.get();
      if (pgDoc.exists && pgDoc.data().ownerId === uid) {
        await pgRef.update({ ownerId: null });
      }
    }

    await userRef.delete();
    return { role, deleted: true };
  }

  const refreshTokens = await queryByField(db, 'refreshTokens', 'uid', uid);
  await deleteDocsInBatches(db, refreshTokens);
  await userRef.delete();
  return { role, deleted: true };
}
