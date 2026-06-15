import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyFirebase } from '../../../middleware/verifyFirebase';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { isAdminEmail } from '../../../config/admins';
import { getAuth, getFirestore } from '../../../lib/firebaseAdmin';
import { rateLimit } from '../../../middleware/rateLimit';
import { userHasPasswordProvider } from '../../../lib/userValidation';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    rateLimit(req);

    // Accept JWT (after establishSession) or Firebase ID token from Authorization header
    let decoded;
    try {
      decoded = await verifyAuth(req);
    } catch {
      decoded = await verifyFirebase(req);
    }

    const uid = decoded.uid;
    const email = decoded.email?.toLowerCase();
    const { sitePgId } = req.body;

    if (!sitePgId) {
      return error(res, 'PG site identifier is required', 400);
    }

    if (!isAdminEmail(email, sitePgId)) {
      return error(res, 'This account is not authorized for admin access', 403);
    }

    const db = getFirestore();
    const pgRef = db.collection('pgs').doc(sitePgId);
    const pgDoc = await pgRef.get();

    if (!pgDoc.exists) {
      return error(res, 'PG not found for this site', 404);
    }

    let name = decoded.name;
    const userRecord = await getAuth().getUser(uid);
    if (!name) {
      name = userRecord.displayName;
    }
    if (!name) {
      return error(res, 'Name is required on your account profile', 400);
    }

    const hasPassword = userHasPasswordProvider(userRecord);
    const now = new Date().toISOString();
    const batch = db.batch();

    batch.set(
      db.collection('users').doc(uid),
      {
        role: 'owner',
        name,
        email,
        phone: '',
        pgId: sitePgId,
        passwordSet: hasPassword,
        createdAt: now,
      },
      { merge: true }
    );

    batch.update(pgRef, { ownerId: uid });

    const tenantRef = db.collection('tenants').doc(uid);
    const tenantDoc = await tenantRef.get();
    if (tenantDoc.exists) {
      batch.delete(tenantRef);
    }

    await batch.commit();

    return success(res, {
      role: 'owner',
      pgId: sitePgId,
      isAdmin: true,
      needsPasswordSetup: !hasPassword,
    });
  } catch (err) {
    console.error('admin-login error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
