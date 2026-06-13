/**
 * Load tenants assigned to a PG from the tenants collection (source of truth for assignments).
 * Uses a single-field pgId query to avoid composite Firestore indexes.
 */
export async function loadTenantsForPg(db, pgId, { statuses = null } = {}) {
  const [tenantsSnap, roomsSnap] = await Promise.all([
    db.collection('tenants').where('pgId', '==', pgId).get(),
    db.collection('rooms').where('pgId', '==', pgId).get(),
  ]);

  const roomsById = {};
  roomsSnap.docs.forEach((doc) => {
    roomsById[doc.id] = doc.data();
  });

  const tenants = await Promise.all(
    tenantsSnap.docs.map(async (doc) => {
      const tenantData = doc.data();

      if (statuses && !statuses.includes(tenantData.status)) {
        return null;
      }

      const userDoc = await db.collection('users').doc(doc.id).get();
      if (!userDoc.exists) {
        return null;
      }

      const userData = userDoc.data();
      const room = tenantData.roomId ? roomsById[tenantData.roomId] : null;

      return {
        uid: doc.id,
        name: userData.name || 'Unknown',
        email: userData.email || '',
        phone: userData.phone || '',
        ...tenantData,
        roomNumber: room?.roomNumber ?? room?.houseNumber ?? null,
        rentAmount: room?.rentAmount ?? room?.rent ?? null,
      };
    })
  );

  return tenants.filter(Boolean);
}
