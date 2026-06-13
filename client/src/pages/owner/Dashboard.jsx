import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import api from '../../lib/api';
import Navbar from '../../components/Navbar';
import CleaningRequestsPanel from '../../components/CleaningRequestsPanel';
import { useCleaningAlerts } from '../../context/CleaningNotificationContext';
import { usePGConfig } from '../../hooks/usePGConfig';
import { ownerLinks } from '../../lib/navLinks';
import { ROOM_STATUS_STYLES, TENANT_STATUS_STYLES, TENANT_STATUS_LABELS } from '../../lib/room';

export default function OwnerDashboard() {
  const { pgId } = useParams();
  const { config } = usePGConfig();
  const alerts = useCleaningAlerts();
  const [rooms, setRooms] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [resolvingId, setResolvingId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setError('');
        const [roomsRes, summaryRes, tenantsRes] = await Promise.all([
          api.get('/api/owner/rooms'),
          api.get('/api/owner/payments/summary'),
          api.get('/api/owner/tenants'),
        ]);
        if (roomsRes.data.success) setRooms(roomsRes.data.data);
        if (summaryRes.data.success) setSummary(summaryRes.data.data);
        if (tenantsRes.data.success) {
          setTenants(tenantsRes.data.data.filter((t) => t.status !== 'moved_out'));
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleMarkDone = async (requestId) => {
    try {
      setResolvingId(requestId);
      await alerts?.markDone(requestId);
    } finally {
      setResolvingId(null);
    }
  };

  const totalBeds = rooms.reduce((sum, r) => sum + (r.sharingCapacity || 0), 0);
  const occupiedBeds = rooms.reduce((sum, r) => sum + (r.currentOccupancy || 0), 0);

  const chartData = summary
    ? [
        { name: 'Collected', value: summary.totalPaid },
        { name: 'Pending', value: summary.totalPending },
      ]
    : [];

  const paidTenants = summary?.tenantBreakdown?.filter((t) => t.status === 'paid') || [];
  const unpaidTenants = summary?.tenantBreakdown?.filter((t) => t.status === 'unpaid') || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar links={ownerLinks(pgId)} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Owner dashboard</p>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {config?.name}
            </h1>
          </div>
          {alerts?.pendingCount > 0 && (
            <p className="text-sm font-medium text-amber-700">
              {alerts.pendingCount} cleaning alert{alerts.pendingCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        {loading ? (
          <div className="mt-12 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="mt-6 space-y-6 sm:mt-8">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
              <StatCard label="Tenants" value={tenants.length} />
              <StatCard label="Rooms" value={rooms.length} />
              <StatCard label="Beds" value={`${occupiedBeds}/${totalBeds}`} accent="text-emerald-600" />
              <StatCard
                label="Collected"
                value={`₹${(summary?.totalPaid || 0).toLocaleString('en-IN')}`}
                accent="text-emerald-600"
              />
              <StatCard
                label="Pending rent"
                value={`₹${(summary?.totalPending || 0).toLocaleString('en-IN')}`}
                accent="text-rose-600"
                className="col-span-2 lg:col-span-1"
              />
            </div>

            {alerts && (
              <CleaningRequestsPanel
                requests={alerts.requests}
                onMarkDone={handleMarkDone}
                resolvingId={resolvingId}
              />
            )}

            <div className="grid gap-6 xl:grid-cols-2">
              <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900">Payments</h2>
                <p className="text-sm text-gray-500">
                  {summary ? `${summary.month}/${summary.year}` : 'This month'}
                </p>
                <div className="mt-4 h-48 sm:h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} width={48} />
                      <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        <Cell fill="#22c55e" />
                        <Cell fill="#ef4444" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 text-sm">
                  <div>
                    <h3 className="font-medium text-emerald-700">Paid ({paidTenants.length})</h3>
                    <ul className="mt-2 max-h-32 space-y-1 overflow-y-auto text-gray-600">
                      {paidTenants.map((t) => (
                        <li key={t.tenantId} className="truncate">{t.name} — ₹{t.amount}</li>
                      ))}
                      {paidTenants.length === 0 && <li className="text-gray-400">None yet</li>}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-rose-700">Unpaid ({unpaidTenants.length})</h3>
                    <ul className="mt-2 max-h-32 space-y-1 overflow-y-auto text-gray-600">
                      {unpaidTenants.map((t) => (
                        <li key={t.tenantId} className="truncate">{t.name} — ₹{t.amount}</li>
                      ))}
                      {unpaidTenants.length === 0 && <li className="text-gray-400">All paid</li>}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Tenants</h2>
                  <Link to={`/${pgId}/owner/tenants`} className="text-sm font-medium text-primary hover:underline">
                    View all
                  </Link>
                </div>
                <div className="mt-4 max-h-80 space-y-2 overflow-y-auto">
                  {tenants.map((tenant) => (
                    <div
                      key={tenant.uid}
                      className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2.5 transition hover:bg-slate-100 sm:px-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium text-gray-900">{tenant.name}</p>
                        <p className="truncate text-xs text-gray-500">
                          {tenant.roomNumber ? `Room ${tenant.roomNumber}` : 'Unassigned'}
                        </p>
                      </div>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${TENANT_STATUS_STYLES[tenant.status] || 'bg-gray-100 text-gray-600'}`}>
                        {TENANT_STATUS_LABELS[tenant.status] || tenant.status}
                      </span>
                    </div>
                  ))}
                  {tenants.length === 0 && (
                    <p className="py-6 text-center text-sm text-gray-500">
                      <Link to={`/${pgId}/owner/add-tenant`} className="text-primary hover:underline">
                        Add a tenant
                      </Link>
                    </p>
                  )}
                </div>
              </section>
            </div>

            <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Rooms</h2>
                <Link to={`/${pgId}/owner/rooms`} className="text-sm font-medium text-primary hover:underline">
                  Manage
                </Link>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 transition hover:bg-slate-100 sm:px-4"
                  >
                    <span className="font-medium text-gray-900">Room {room.roomNumber}</span>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">
                        {room.currentOccupancy || 0}/{room.sharingCapacity}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${ROOM_STATUS_STYLES[room.status] || 'bg-gray-100 text-gray-600'}`}>
                        {room.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, accent = 'text-primary', className = '' }) {
  return (
    <div className={`rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5 ${className}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 sm:text-sm sm:normal-case sm:tracking-normal">
        {label}
      </p>
      <p className={`mt-1 text-xl font-bold sm:text-2xl ${accent}`}>{value}</p>
    </div>
  );
}
