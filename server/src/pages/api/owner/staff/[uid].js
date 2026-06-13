import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../middleware/requireAdmin';
import { getAuth, getFirestore } from '../../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'DELETE') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireAdmin(decoded.uid);
    const db = getFirestore();

    const staffUid = req.query.uid;

    const staffDoc = await db.collection('users').doc(staffUid).get();

    if (!staffDoc.exists || staffDoc.data().role !== 'staff' || staffDoc.data().pgId !== user.pgId) {
      return error(res, 'Staff account not found in your PG', 404);
    }

    await getAuth().deleteUser(staffUid);
    await db.collection('users').doc(staffUid).delete();

    return success(res, { uid: staffUid, deleted: true });
  } catch (err) {
    console.error('staff delete error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
