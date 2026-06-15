import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { getAuth, getFirestore } from '../../../lib/firebaseAdmin';
import { validatePassword } from '../../../lib/passwordPolicy';
import { requireRole } from '../../../middleware/requireRole';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    await requireRole(decoded.uid, ['owner']);

    const passwordError = validatePassword(req.body?.password);
    if (passwordError) {
      return error(res, passwordError, 400);
    }

    const auth = getAuth();
    const db = getFirestore();

    await auth.updateUser(decoded.uid, {
      password: req.body.password,
    });

    await db.collection('users').doc(decoded.uid).set(
      {
        passwordSet: true,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    return success(res, { passwordSet: true });
  } catch (err) {
    console.error('set-password error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
