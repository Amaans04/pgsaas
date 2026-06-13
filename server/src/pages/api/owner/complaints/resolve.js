import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireStaffOrAdmin } from '../../../../middleware/requireStaffOrAdmin';
import { getFirestore } from '../../../../lib/firebaseAdmin';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'POST') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireStaffOrAdmin(decoded.uid);
    const db = getFirestore();
    const pgId = user.pgId;

    const { complaintId, status } = req.body;

    if (!complaintId || !status) {
      return error(res, 'complaintId and status are required', 400);
    }

    if (!['open', 'in-progress', 'resolved'].includes(status)) {
      return error(res, 'Invalid status', 400);
    }

    const complaintRef = db.collection('complaints').doc(complaintId);
    const complaintDoc = await complaintRef.get();

    if (!complaintDoc.exists) {
      return error(res, 'Complaint not found', 404);
    }

    if (complaintDoc.data().pgId !== pgId) {
      return error(res, 'Access denied', 403);
    }

    const updateData = { status };
    if (status === 'resolved') {
      updateData.resolvedAt = new Date().toISOString();
    }

    await complaintRef.update(updateData);

    return success(res, { complaintId, status, ...updateData });
  } catch (err) {
    console.error('resolve complaint error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
