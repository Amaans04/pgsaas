import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { rateLimit } from '../../../middleware/rateLimit';
import { getAuth, getFirestore } from '../../../lib/firebaseAdmin';
import { validatePhone, validateName } from '../../../lib/passwordPolicy';
import {
  getOwnerEmailConflict,
  isPhoneTaken,
  normalizePhone,
} from '../../../lib/userValidation';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    rateLimit(req);

    const decoded = await verifyAuth(req);
    const uid = decoded.uid;
    const db = getFirestore();

    const existingUser = await db.collection('users').doc(uid).get();
    const existing = existingUser.exists ? existingUser.data() : null;

    if (existing && normalizePhone(existing.phone).length >= 10) {
      const profile = {
        uid,
        ...existing,
        email: (decoded.email || existing.email || '').toLowerCase(),
        onboarded: true,
        hasPhone: true,
      };
      return success(res, {
        role: existing.role || 'tenant',
        status: 'already_onboarded',
        profile,
      });
    }

    const { role, phone, name: bodyName } = req.body;

    if (role !== 'tenant') {
      return error(res, 'Only tenant signup is allowed through this endpoint', 403);
    }

    const phoneError = validatePhone(phone);
    if (phoneError) {
      return error(res, phoneError, 400);
    }

    const normalizedPhone = normalizePhone(phone);
    if (await isPhoneTaken(db, normalizedPhone, uid)) {
      return error(res, 'This phone number is already registered', 400);
    }

    let name = decoded.name || bodyName || existing?.name;
    let photoURL = existing?.photoURL || null;
    const userRecord = await getAuth().getUser(uid);
    if (!name) name = userRecord.displayName;
    if (!photoURL) photoURL = userRecord.photoURL || null;

    const nameError = validateName(name);
    if (nameError) {
      return error(res, nameError, 400);
    }
    name = String(name).trim();

    const email = (decoded.email || userRecord.email || existing?.email || '').toLowerCase();
    const ownerConflict = await getOwnerEmailConflict(db, email);
    if (ownerConflict) {
      return error(res, ownerConflict, 400);
    }

    await db.collection('users').doc(uid).set(
      {
        role: 'tenant',
        name,
        email,
        phone: normalizedPhone,
        photoURL,
        pgId: existing?.pgId ?? null,
        createdAt: existing?.createdAt || new Date().toISOString(),
      },
      { merge: true }
    );

    const profile = {
      uid,
      role: 'tenant',
      name,
      email,
      phone: normalizedPhone,
      photoURL,
      pgId: existing?.pgId ?? null,
      onboarded: true,
      hasPhone: true,
    };

    return success(res, { role: 'tenant', status: existing ? 'phone_added' : 'unassigned', profile });
  } catch (err) {
    console.error('onboard error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
