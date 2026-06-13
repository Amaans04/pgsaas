const COLLECTION = 'refreshTokens';

export async function storeRefreshToken(db, jti, uid) {
  await db.collection(COLLECTION).doc(jti).set({
    uid,
    revoked: false,
    createdAt: new Date().toISOString(),
  });
}

export async function isRefreshTokenActive(db, jti, uid) {
  const doc = await db.collection(COLLECTION).doc(jti).get();
  if (!doc.exists) return false;
  const data = doc.data();
  return data.uid === uid && data.revoked !== true;
}

export async function revokeRefreshToken(db, jti) {
  await db.collection(COLLECTION).doc(jti).set({ revoked: true }, { merge: true });
}

export async function revokeAllForUser(db, uid) {
  // Single-field query (uid only) + in-memory filter, so we don't depend on a
  // composite (uid + revoked) Firestore index — matches the index-avoidance
  // pattern used elsewhere in this codebase.
  const snapshot = await db.collection(COLLECTION).where('uid', '==', uid).get();
  const active = snapshot.docs.filter((doc) => doc.data().revoked !== true);
  if (active.length === 0) return;

  const batch = db.batch();
  active.forEach((doc) => batch.update(doc.ref, { revoked: true }));
  await batch.commit();
}
