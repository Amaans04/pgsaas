import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../middleware/requireAdmin';
import { getAuth, getFirestore } from '../../../../lib/firebaseAdmin';

function generateTempPassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let pwd = '';
  for (let i = 0; i < 10; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)];
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

    if (!email || !name) {
      return error(res, 'email and name are required', 400);
    }

    const auth = getAuth();

    let existing = null;
    try {
      existing = await auth.getUserByEmail(email);
    } catch {
      // user does not exist yet — expected for new staff
    }

    if (existing) {
      return error(res, 'A user with this email already exists', 400);
    }

    const tempPassword = generateTempPassword();
    const staffUser = await auth.createUser({
      email,
      password: tempPassword,
      displayName: name,
      emailVerified: true,
    });

    await db.collection('users').doc(staffUser.uid).set({
      role: 'staff',
      name,
      email: email.toLowerCase(),
      phone: '',
      pgId,
      createdBy: decoded.uid,
      createdAt: new Date().toISOString(),
    });

    return success(res, {
      uid: staffUser.uid,
      email,
      name,
      tempPassword,
    }, 201);
  } catch (err) {
    console.error('staff create error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
