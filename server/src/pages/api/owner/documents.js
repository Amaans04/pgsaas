import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { requireAdmin } from '../../../middleware/requireAdmin';
import { getFirestore } from '../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireAdmin(decoded.uid);
    const db = getFirestore();
    const pgId = user.pgId;

    // Collect the PG's tenant ids so docs uploaded before assignment
    // (pgId null on the document) are still visible to the owner.
    const tenantUsersSnapshot = await db
      .collection('users')
      .where('pgId', '==', pgId)
      .where('role', '==', 'tenant')
      .get();

    const tenantIds = tenantUsersSnapshot.docs.map((doc) => doc.id);
    const namesByUid = {};
    tenantUsersSnapshot.docs.forEach((doc) => {
      namesByUid[doc.id] = doc.data().name;
    });

    if (tenantIds.length === 0) {
      return success(res, []);
    }

    // Firestore 'in' supports max 30 values per query
    const chunks = [];
    for (let i = 0; i < tenantIds.length; i += 30) {
      chunks.push(tenantIds.slice(i, i + 30));
    }

    const documents = [];
    for (const chunk of chunks) {
      const snapshot = await db.collection('documents').where('userId', 'in', chunk).get();
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        documents.push({ id: doc.id, ...data, tenantName: namesByUid[data.userId] || 'Unknown' });
      });
    }

    documents.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

    return success(res, documents);
  } catch (err) {
    console.error('owner documents error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
