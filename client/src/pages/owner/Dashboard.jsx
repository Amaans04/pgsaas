import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import api from '../../lib/api';
import Navbar from '../../components/Navbar';
import { usePGConfig } from '../../hooks/usePGConfig';
import { ownerLinks } from '../../lib/navLinks';
import { ROOM_STATUS_STYLES, TENANT_STATUS_STYLES, TENANT_STATUS_LABELS } from '../../lib/room';

export default function OwnerDashboard() {
  const { pgId } = useParams();
  const { config } = usePGConfig();
  const [rooms, setRooms] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    <div className="min-h-screen bg-gray-50">
      <Navbar links={ownerLinks(pgId)} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">{config?.name} — Dashboard</h1>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <StatCard label="Active Tenants" value={tenants.length} />
              <StatCard label="Total Rooms" value={rooms.length} />
              <StatCard label="Beds Occupied" value={`${occupiedBeds} / ${totalBeds}`} color="text-green-600" />
              <StatCard
                label="Collected This Month"
                value={`₹${(summary?.totalPaid || 0).toLocaleString('en-IN')}`}
                color="text-green-600"
              />
              <StatCard
                label="Pending This Month"
                value={`₹${(summary?.totalPending || 0).toLocaleString('en-IN')}`}
                color="text-red-600"
              />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <section className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold">Payments Overview</h2>
                <p className="text-sm text-gray-500">
                  Rent for {summary ? `${summary.month}/${summary.year}` : 'this month'}
                </p>
                <div className="mt-4 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        <Cell fill="#22c55e" />
                        <Cell fill="#ef4444" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="font-medium text-green-700">Paid ({paidTenants.length})</h3>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      {paidTenants.map((t) => (
                        <li key={t.tenantId}>{t.name} — ₹{t.amount}</li>
                      ))}
                      {paidTenants.length === 0 && <li className="text-gray-400">None yet</li>}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-red-700">Not Paid ({unpaidTenants.length})</h3>
                    <ul className="mt-2 space-y-1 text-gray-600">
                      {unpaidTenants.map((t) => (
                        <li key={t.tenantId}>{t.name} — ₹{t.amount}</li>
                      ))}
                      {unpaidTenants.length === 0 && <li className="text-gray-400">All paid</li>}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="rounded-xl bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Tenants Overview</h2>
                  <Link to={`/${pgId}/owner/tenants`} className="text-sm text-primary hover:underline">
                    View all
                  </Link>
                </div>
                <div className="mt-4 space-y-2">
                  {tenants.map((tenant) => (
                    <div key={tenant.uid} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2">
                      <div>
                        <span className="font-medium">{tenant.name}</span>
                        <p className="text-xs text-gray-500">
                          {tenant.roomNumber ? `Room ${tenant.roomNumber}` : 'Unassigned'}
                          {tenant.rentAmount ? ` · ₹${tenant.rentAmount}/mo` : ''}
                        </p>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TENANT_STATUS_STYLES[tenant.status] || 'bg-gray-100 text-gray-600'}`}>
                        {TENANT_STATUS_LABELS[tenant.status] || tenant.status}
                      </span>
                    </div>
                  ))}
                  {tenants.length === 0 && (
                    <p className="text-sm text-gray-500">
                      No tenants assigned yet.{' '}
                      <Link to={`/${pgId}/owner/add-tenant`} className="text-primary hover:underline">
                        Add a tenant
                      </Link>
                    </p>
                  )}
                </div>
              </section>
            </div>

            <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Rooms Overview</h2>
                <Link to={`/${pgId}/owner/rooms`} className="text-sm text-primary hover:underline">
                  Manage
                </Link>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {rooms.map((room) => (
                  <div key={room.id} className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2">
                    <span className="font-medium">Room {room.roomNumber}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">
                        {room.currentOccupancy || 0}/{room.sharingCapacity}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${ROOM_STATUS_STYLES[room.status] || 'bg-gray-100 text-gray-600'}`}>
                        {room.status}
                      </span>
                    </div>
                  </div>
                ))}
                {rooms.length === 0 && <p className="text-sm text-gray-500">No rooms added yet</p>}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, color = 'text-primary' }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
