import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireRole } from '../../../../middleware/requireRole';
import { getFirestore } from '../../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireRole(decoded.uid, ['tenant']);
    const db = getFirestore();
    const pgId = user.pgId;
    const tenantId = decoded.uid;

    if (!pgId) {
      return error(res, 'You are not assigned to a PG yet. Ask your PG owner to add you.', 400);
    }

    const { type, description } = req.body;

    if (!type || !description || typeof description !== 'string') {
      return error(res, 'type and description are required', 400);
    }

    if (!['cleaning', 'maintenance', 'other'].includes(type)) {
      return error(res, 'Invalid complaint type', 400);
    }

    const trimmedDescription = description.trim();
    if (!trimmedDescription || trimmedDescription.length > 1000) {
      return error(res, 'Description must be between 1 and 1000 characters', 400);
    }

    const tenantDoc = await db.collection('tenants').doc(tenantId).get();
    const roomId = tenantDoc.exists ? tenantDoc.data().roomId || null : null;

    const complaintRef = db.collection('complaints').doc();
    const complaintData = {
      tenantId,
      pgId,
      roomId,
      type,
      description: trimmedDescription,
      status: 'open',
      createdAt: new Date().toISOString(),
      resolvedAt: null,
    };

    await complaintRef.set(complaintData);

    return success(res, { id: complaintRef.id, ...complaintData }, 201);
  } catch (err) {
    console.error('create complaint error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
