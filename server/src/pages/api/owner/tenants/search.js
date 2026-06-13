import { handleCors } from '../../../../lib/cors';
import { success, error } from '../../../../lib/apiResponse';
import { verifyAuth } from '../../../../middleware/verifyAuth';
import { requireAdmin } from '../../../../middleware/requireAdmin';
import { getFirestore } from '../../../../lib/firebaseAdmin';

function mapTenantDoc(doc) {
  const data = doc.data();
  return {
    uid: doc.id,
    name: data.name || 'Unknown',
    email: data.email || '',
    phone: data.phone || '',
    pgId: data.pgId || null,
    assigned: !!data.pgId,
    createdAt: data.createdAt || null,
  };
}

function matchesQuery(tenant, query) {
  const q = query.toLowerCase();
  const name = (tenant.name || '').toLowerCase();
  const email = (tenant.email || '').toLowerCase();
  const phone = (tenant.phone || '').replace(/\s/g, '');

  if (name.includes(q)) return true;
  if (email.includes(q)) return true;
  if (phone.includes(q.replace(/\s/g, ''))) return true;

  // Allow searching "rahul sh" style by matching each word in the name
  const words = q.split(/\s+/).filter(Boolean);
  if (words.length > 1 && words.every((word) => name.includes(word))) return true;

  return false;
}

export default async function handler(req, res) {
  try {
    if (handleCors(req, res)) return;

    if (req.method !== 'GET') {
      return error(res, 'Method not allowed', 405);
    }

    const decoded = await verifyAuth(req);
    await requireAdmin(decoded.uid);
    const db = getFirestore();

    const query = String(req.query.q || '').trim();
    const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 100);

    // Single query — filter unassigned tenants in memory (name / phone / email search)
    const snapshot = await db.collection('users').where('role', '==', 'tenant').get();

    let results = snapshot.docs
      .map(mapTenantDoc)
      .filter((tenant) => !tenant.assigned);

    if (query) {
      results = results.filter((tenant) => matchesQuery(tenant, query));
    }

    results.sort((a, b) => {
      const nameCmp = a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
      if (nameCmp !== 0) return nameCmp;
      return (b.createdAt || '').localeCompare(a.createdAt || '');
    });

    const totalUnassigned = snapshot.docs.filter((doc) => !doc.data().pgId).length;

    return success(res, {
      results: results.slice(0, limit),
      totalUnassigned,
      totalMatches: results.length,
    });
  } catch (err) {
    console.error('tenant search error:', err);
    return error(res, err.message || 'Internal server error', err.statusCode || 500);
  }
}
