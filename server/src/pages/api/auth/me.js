import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { getFirestore } from '../../../lib/firebaseAdmin';
import { isAdminEmail } from '../../../config/admins';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const uid = decoded.uid;
    const db = getFirestore();

    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return success(res, {
        uid,
        email: decoded.email,
        onboarded: false,
      });
    }

    const userData = userDoc.data();
    let pgData = null;

    if (userData.pgId) {
      const pgDoc = await db.collection('pgs').doc(userData.pgId).get();
      if (pgDoc.exists) {
        pgData = { id: pgDoc.id, ...pgDoc.data() };
      }
    }

    let tenantData = null;
    if (userData.role === 'tenant') {
      const tenantDoc = await db.collection('tenants').doc(uid).get();
      if (tenantDoc.exists) {
        tenantData = tenantDoc.data();
        if (tenantData.roomId) {
          const roomDoc = await db.collection('rooms').doc(tenantData.roomId).get();
          if (roomDoc.exists) {
            const room = roomDoc.data();
            tenantData.roomNumber = room.roomNumber;
            tenantData.rentAmount = room.rentAmount;
          }
        }
      }
    }

    const email = (decoded.email || userData.email || '').toLowerCase();

    return success(res, {
      uid,
      ...userData,
      email,
      onboarded: true,
      isAdmin: userData.role === 'owner' && isAdminEmail(email, userData.pgId),
      pg: pgData,
      tenant: tenantData,
    });
  } catch (err) {
    console.error('me error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
