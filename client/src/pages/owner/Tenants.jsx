import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../lib/api';
import Navbar from '../../components/Navbar';
import { ownerLinks } from '../../lib/navLinks';
import { TENANT_STATUS_STYLES, TENANT_STATUS_LABELS } from '../../lib/room';

export default function OwnerTenants() {
  const { pgId } = useParams();
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noticeDates, setNoticeDates] = useState({});
  const [message, setMessage] = useState(null);

  const fetchTenants = async () => {
    try {
      const { data } = await api.get('/api/owner/tenants');
      if (data.success) setTenants(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const handleGiveNotice = async (tenantId) => {
    const moveOutDate = noticeDates[tenantId];
    if (!moveOutDate) {
      setMessage({ type: 'error', text: 'Pick a move-out date first' });
      return;
    }
    try {
      const { data } = await api.post('/api/tenant/notice', { tenantId, moveOutDate });
      if (data.success) {
        setMessage({ type: 'success', text: 'Notice recorded' });
        fetchTenants();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to submit notice' });
    }
  };

  const handleConfirmMoveout = async (tenantId) => {
    try {
      const { data } = await api.post('/api/owner/confirm-moveout', { tenantId });
      if (data.success) {
        setMessage({ type: 'success', text: 'Move-out confirmed. Room slot freed.' });
        fetchTenants();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to confirm move-out' });
    }
  };

  const handleDeleteTenant = async (tenant) => {
    if (
      !window.confirm(
        `Remove ${tenant.name} from your PG? Their account stays — they can be added again later.`
      )
    ) {
      return;
    }

    try {
      const { data } = await api.delete(`/api/owner/tenants/${tenant.uid}`);
      if (data.success) {
        setMessage({ type: 'success', text: `${tenant.name} removed from your PG` });
        fetchTenants();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to remove tenant' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar links={ownerLinks(pgId)} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">All Tenants</h1>
          <Link
            to={`/${pgId}/owner/add-tenant`}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Add Tenant
          </Link>
        </div>

        {message && (
          <div className={`mt-4 rounded-lg p-3 text-sm ${
            message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
          }`}>
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {tenants.map((tenant) => (
              <div key={tenant.uid} className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{tenant.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{tenant.email}</p>
                    <p className="text-sm text-gray-500">{tenant.phone}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${TENANT_STATUS_STYLES[tenant.status] || 'bg-gray-100 text-gray-600'}`}>
                    {TENANT_STATUS_LABELS[tenant.status] || tenant.status || 'Unknown'}
                  </span>
                </div>

                <dl className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Room</dt>
                    <dd className="font-medium">{tenant.roomNumber || 'Unassigned'}</dd>
                  </div>
                  {tenant.rentAmount && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Rent</dt>
                      <dd className="font-medium">₹{tenant.rentAmount}/month</dd>
                    </div>
                  )}
                  {tenant.moveInDate && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Moved in</dt>
                      <dd>{new Date(tenant.moveInDate).toLocaleDateString()}</dd>
                    </div>
                  )}
                  {tenant.noticeGiven && tenant.moveOutDate && (
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Move-out date</dt>
                      <dd className="font-medium text-yellow-700">
                        {new Date(tenant.moveOutDate).toLocaleDateString()}
                      </dd>
                    </div>
                  )}
                </dl>

                {tenant.status === 'active' && (
                  <div className="mt-4 flex gap-2 border-t pt-4">
                    <input
                      type="date"
                      value={noticeDates[tenant.uid] || ''}
                      onChange={(e) => setNoticeDates({ ...noticeDates, [tenant.uid]: e.target.value })}
                      className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
                    />
                    <button
                      onClick={() => handleGiveNotice(tenant.uid)}
                      className="rounded-lg border border-yellow-500 px-3 py-1.5 text-sm font-medium text-yellow-700 hover:bg-yellow-50"
                    >
                      Give Notice
                    </button>
                  </div>
                )}

                {tenant.status === 'notice_period' && (
                  <div className="mt-4 border-t pt-4">
                    <button
                      onClick={() => handleConfirmMoveout(tenant.uid)}
                      className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
                    >
                      Confirm Move-Out
                    </button>
                  </div>
                )}

                <div className="mt-4 border-t pt-4">
                  <button
                    type="button"
                    onClick={() => handleDeleteTenant(tenant)}
                    className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Remove Tenant
                  </button>
                </div>
              </div>
            ))}
            {tenants.length === 0 && (
              <p className="col-span-full text-center text-gray-500">No tenants yet. Use "Add Tenant" to assign one.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
