import { getFirestore } from '../lib/firebaseAdmin';

export async function requireRole(uid, allowedRoles) {
  const db = getFirestore();
  const userDoc = await db.collection('users').doc(uid).get();

  if (!userDoc.exists) {
    const err = new Error('User profile not found. Complete onboarding first.');
    err.statusCode = 403;
    throw err;
  }

  const userData = userDoc.data();
  const role = userData.role;

  if (!allowedRoles.includes(role)) {
    const err = new Error(`Access denied. Required role: ${allowedRoles.join(' or ')}`);
    err.statusCode = 403;
    throw err;
  }

  return { ...userData, uid };
}
