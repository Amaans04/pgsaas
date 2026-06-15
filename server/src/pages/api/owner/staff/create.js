import crypto from 'crypto';
import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../middleware/requireAdmin';
import { getAuth, getFirestore } from '../../../../lib/firebaseAdmin';
import { validateEmail, validateName, normalizeEmail } from '../../../../lib/passwordPolicy';
import { getOwnerEmailConflict } from '../../../../lib/userValidation';

function generateTempPassword() {
  // Cryptographically secure — crypto.randomInt avoids the predictability of Math.random().
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let pwd = '';
  for (let i = 0; i < 12; i++) {
    pwd += chars[crypto.randomInt(chars.length)];
  }
  return `${pwd}!1`;
}

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

    const { email, name } = req.body;

    const emailError = validateEmail(email);
    if (emailError) {
      return error(res, emailError, 400);
    }
    const nameError = validateName(name);
    if (nameError) {
      return error(res, nameError, 400);
    }

    const normalizedEmail = normalizeEmail(email);
    const trimmedName = String(name).trim();
    const auth = getAuth();

    const ownerConflict = await getOwnerEmailConflict(db, normalizedEmail);
    if (ownerConflict) {
      return error(res, ownerConflict, 400);
    }

    let existing = null;
    try {
      existing = await auth.getUserByEmail(normalizedEmail);
    } catch {
      // user does not exist yet — expected for new staff
    }

    if (existing) {
      return error(res, 'A user with this email already exists', 400);
    }

    const tempPassword = generateTempPassword();
    const staffUser = await auth.createUser({
      email: normalizedEmail,
      password: tempPassword,
      displayName: trimmedName,
      emailVerified: true,
    });

    await db.collection('users').doc(staffUser.uid).set({
      role: 'staff',
      name: trimmedName,
      email: normalizedEmail,
      phone: '',
      pgId,
      createdBy: decoded.uid,
      createdAt: new Date().toISOString(),
    });

    return success(res, {
      uid: staffUser.uid,
      email: normalizedEmail,
      name: trimmedName,
      tempPassword,
    }, 201);
  } catch (err) {
    console.error('staff create error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
