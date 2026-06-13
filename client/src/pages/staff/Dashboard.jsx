import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../lib/api';
import Navbar from '../../components/Navbar';
import { usePGConfig } from '../../hooks/usePGConfig';
import { staffLinks } from '../../lib/navLinks';
import { ROOM_STATUS_STYLES } from '../../lib/room';

export default function StaffDashboard() {
  const { pgId } = useParams();
  const { config } = usePGConfig();
  const [rooms, setRooms] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const openComplaints = complaints.filter((c) => c.status !== 'resolved');
  const totalBeds = rooms.reduce((sum, r) => sum + (r.sharingCapacity || 0), 0);
  const occupiedBeds = rooms.reduce((sum, r) => sum + (r.currentOccupancy || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar links={staffLinks(pgId)} />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">{config?.name} — Staff Dashboard</h1>

        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Rooms</p>
                <p className="mt-1 text-2xl font-bold text-primary">{rooms.length}</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Beds Occupied</p>
                <p className="mt-1 text-2xl font-bold text-green-600">{occupiedBeds} / {totalBeds}</p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Open Complaints</p>
                <p className="mt-1 text-2xl font-bold text-red-600">{openComplaints.length}</p>
              </div>
            </div>

            <section className="mt-8 rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Room Occupancy</h2>
                <Link to={`/${pgId}/staff/complaints`} className="text-sm text-primary hover:underline">
                  View complaints
                </Link>
              </div>
              <div className="mt-4 space-y-2">
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
                {rooms.length === 0 && <p className="text-sm text-gray-500">No rooms yet</p>}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
