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
  const snapshot = await db.collection(COLLECTION).where('uid', '==', uid).where('revoked', '==', false).get();
  if (snapshot.empty) return;

  const batch = db.batch();
  snapshot.docs.forEach((doc) => batch.update(doc.ref, { revoked: true }));
  await batch.commit();
}
