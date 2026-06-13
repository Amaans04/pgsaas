import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../middleware/requireAdmin';
import { getFirestore } from '../../../../lib/firebaseAdmin';
import { loadTenantsForPg } from '../../../../lib/tenants';

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    const user = await requireAdmin(decoded.uid);
    const db = getFirestore();
    const tenants = await loadTenantsForPg(db, user.pgId);

    tenants.sort((a, b) => a.name.localeCompare(b.name));

    return success(res, tenants);
  } catch (err) {
    console.error('owner tenants error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
