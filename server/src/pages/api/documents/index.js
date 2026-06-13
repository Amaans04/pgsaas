import { handleCors } from '../../../lib/cors';
import { success, error } from '../../../lib/apiResponse';
import { verifyAuth } from '../../../middleware/verifyAuth';
import { getFirestore } from '../../../lib/firebaseAdmin';

const VALID_TYPES = ['id_proof', 'agreement', 'other'];

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    const decoded = await verifyAuth(req);
    const db = getFirestore();
    const uid = decoded.uid;

    if (req.method === 'GET') {
      const snapshot = await db.collection('documents').where('userId', '==', uid).get();
      const documents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      documents.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
      return success(res, documents);
    }

    if (req.method === 'POST') {
      const { type, fileUrl, fileName, fileId } = req.body;

      if (!type || !fileUrl || !fileName || !fileId) {
        return error(res, 'type, fileUrl, fileName, and fileId are required', 400);
      }

      if (!VALID_TYPES.includes(type)) {
        return error(res, `type must be one of: ${VALID_TYPES.join(', ')}`, 400);
      }

      const userDoc = await db.collection('users').doc(uid).get();
      const pgId = userDoc.exists ? userDoc.data().pgId || null : null;

      const docRef = db.collection('documents').doc();
      const docData = {
        userId: uid,
        pgId,
        type,
        fileUrl,
        fileName,
        fileId,
        uploadedAt: new Date().toISOString(),
      };

      await docRef.set(docData);
      return success(res, { id: docRef.id, ...docData }, 201);
    }

    return error(res, 'Method not allowed', 405);
  } catch (err) {
    console.error('documents error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
