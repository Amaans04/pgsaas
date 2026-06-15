import { normalizeEmail } from './passwordPolicy';
import { isWhitelistedAdminEmail } from '../config/admins';

export function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '');
}

/** Block tenant/staff signup with owner-reserved emails. */
export async function getOwnerEmailConflict(db, email) {
  const normalized = normalizeEmail(email);
  if (!normalized) return null;

  if (isWhitelistedAdminEmail(normalized)) {
    return 'This email is reserved for the PG owner. Use Owner Login instead.';
  }

  const snap = await db.collection('users').where('email', '==', normalized).limit(5).get();
  const hasOwner = snap.docs.some((doc) => doc.data().role === 'owner');
  if (hasOwner) {
    return 'This email is reserved for the PG owner. Use Owner Login instead.';
  }

  return null;
}

export async function isPhoneTaken(db, phone, excludeUid = null) {
  const normalized = normalizePhone(phone);
  if (!normalized) return false;

  const snap = await db.collection('users').where('phone', '==', normalized).limit(5).get();
  return snap.docs.some((doc) => doc.id !== excludeUid);
}

export function userHasPasswordProvider(userRecord) {
  return userRecord.providerData.some((provider) => provider.providerId === 'password');
}
