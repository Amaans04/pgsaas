import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { rateLimit } from '../../../middleware/rateLimit';
import { getAuth, getFirestore } from '../../../lib/firebaseAdmin';
import { validatePhone, validateName } from '../../../lib/passwordPolicy';

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
    if (existingUser.exists) {
      return error(res, 'User already onboarded', 400);
    }

    const { role, phone, name: bodyName } = req.body;

    if (role !== 'tenant') {
      return error(res, 'Only tenant signup is allowed through this endpoint', 403);
    }

    const phoneError = validatePhone(phone);
    if (phoneError) {
      return error(res, phoneError, 400);
    }

    let name = decoded.name || bodyName;
    let photoURL = null;
    const userRecord = await getAuth().getUser(uid);
    if (!name) name = userRecord.displayName;
    photoURL = userRecord.photoURL || null;

    const nameError = validateName(name);
    if (nameError) {
      return error(res, nameError, 400);
    }
    name = String(name).trim();

    // Tenant starts unassigned — the PG owner adds them to a room later
    // by searching their phone number.
    await db.collection('users').doc(uid).set({
      role: 'tenant',
      name,
      email: decoded.email || userRecord.email || '',
      phone: String(phone).trim(),
      photoURL,
      pgId: null,
      createdAt: new Date().toISOString(),
    });

    return success(res, { role: 'tenant', status: 'unassigned' });
  } catch (err) {
    console.error('onboard error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
