import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../lib/api';
import Navbar from '../../components/Navbar';
import CleaningRequestsPanel from '../../components/CleaningRequestsPanel';
import { useCleaningAlerts } from '../../context/CleaningNotificationContext';
import { usePGConfig } from '../../hooks/usePGConfig';
import { staffLinks } from '../../lib/navLinks';
import { ROOM_STATUS_STYLES } from '../../lib/room';

export default function StaffDashboard() {
  const { pgId } = useParams();
  const { config } = usePGConfig();
  const alerts = useCleaningAlerts();
  const [rooms, setRooms] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolvingId, setResolvingId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [roomsRes, complaintsRes] = await Promise.all([
          api.get('/api/owner/rooms'),
          api.get('/api/owner/complaints'),
        ]);
        if (roomsRes.data.success) setRooms(roomsRes.data.data);
        if (complaintsRes.data.success) setComplaints(complaintsRes.data.data);
      } catch (err) {
        console.error(err);
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

  const openComplaints = complaints.filter((c) => c.status !== 'resolved');
  const totalBeds = rooms.reduce((sum, r) => sum + (r.sharingCapacity || 0), 0);
  const occupiedBeds = rooms.reduce((sum, r) => sum + (r.currentOccupancy || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar links={staffLinks(pgId)} />
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-sm font-medium text-gray-500">Staff dashboard</p>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{config?.name}</h1>

        {loading ? (
          <div className="mt-12 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <StatCard label="Rooms" value={rooms.length} />
              <StatCard label="Beds" value={`${occupiedBeds}/${totalBeds}`} accent="text-emerald-600" />
              <StatCard label="Cleaning" value={alerts?.pendingCount ?? 0} accent="text-amber-600" />
              <StatCard label="Complaints" value={openComplaints.length} accent="text-rose-600" />
            </div>

            {alerts && (
              <CleaningRequestsPanel
                requests={alerts.requests}
                onMarkDone={handleMarkDone}
                resolvingId={resolvingId}
              />
            )}

            <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-gray-900">Room occupancy</h2>
                <Link to={`/${pgId}/staff/complaints`} className="text-sm font-medium text-primary hover:underline">
                  Complaints
                </Link>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {rooms.map((room) => (
                  <div
                    key={room.id}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5 sm:px-4"
                  >
                    <span className="font-medium">Room {room.roomNumber}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {room.currentOccupancy || 0}/{room.sharingCapacity}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${ROOM_STATUS_STYLES[room.status] || 'bg-gray-100 text-gray-600'}`}>
                        {room.status}
                      </span>
                    </div>
                  </div>
                ))}
                {rooms.length === 0 && <p className="text-sm text-gray-500">No rooms yet</p>}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value, accent = 'text-primary' }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <p className="text-xs text-gray-500 sm:text-sm">{label}</p>
      <p className={`mt-1 text-xl font-bold sm:text-2xl ${accent}`}>{value}</p>
    </div>
  );
}
