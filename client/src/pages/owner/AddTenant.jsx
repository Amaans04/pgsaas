import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/api';
import Navbar from '../../components/Navbar';
import { ownerLinks } from '../../lib/navLinks';
import { getSharingCapacity } from '../../lib/room';

function TenantRow({ tenant, availableRooms, selectedRoomId, onRoomChange, onAdd, adding }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900">{tenant.name}</h3>
          <p className="mt-0.5 truncate text-sm text-gray-500">{tenant.email}</p>
          <p className="text-sm text-gray-600">{tenant.phone || 'No phone'}</p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <select
            value={selectedRoomId || ''}
            onChange={(e) => onRoomChange(tenant.uid, e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Select room</option>
            {availableRooms.map((room) => (
              <option key={room.id} value={room.id}>
                Room {room.roomNumber} ({room.currentOccupancy || 0}/{getSharingCapacity(room)}) — ₹
                {room.rentAmount ?? room.rent}
              </option>
            ))}
          </select>
          <button
            type="button"
            disabled={adding}
            onClick={() => onAdd(tenant.uid)}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            {adding ? 'Adding...' : 'Add to Room'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AddTenant() {
  const { pgId } = useParams();
  const [query, setQuery] = useState('');
  const [tenants, setTenants] = useState([]);
  const [totalUnassigned, setTotalUnassigned] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchRooms = useCallback(async () => {
    try {
      const { data } = await api.get('/api/owner/rooms');
      if (data.success) setRooms(data.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchTenants = useCallback(async (searchQuery = '') => {
    try {
      setLoading(true);
      const params = searchQuery.trim() ? { q: searchQuery.trim() } : {};
      const { data } = await api.get('/api/owner/tenants/search', { params });
      if (data.success) {
        setTenants(data.data.results);
        setTotalUnassigned(data.data.totalUnassigned);
        setTotalMatches(data.data.totalMatches);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to load tenants' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTenants(query);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, fetchTenants]);

  const availableRooms = useMemo(
    () => rooms.filter((r) => (r.currentOccupancy || 0) < getSharingCapacity(r)),
    [rooms]
  );

  const handleAdd = async (userId) => {
    const roomId = selectedRoom[userId];
    if (!roomId) {
      setMessage({ type: 'error', text: 'Select a room first' });
      return;
    }

    try {
      setAddingId(userId);
      setMessage(null);
      const { data } = await api.post('/api/owner/tenants/add', { userId, roomId });
      if (data.success) {
        setMessage({
          type: 'success',
          text: `Tenant added to room ${data.data.roomNumber} (${data.data.currentOccupancy} occupant${data.data.currentOccupancy > 1 ? 's' : ''})`,
        });
        setSelectedRoom((prev) => {
          const next = { ...prev };
          delete next[userId];
          return next;
        });
        await Promise.all([fetchRooms(), fetchTenants(query)]);
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to add tenant' });
    } finally {
      setAddingId(null);
    }
  };

  const listLabel = query.trim()
    ? `${totalMatches} match${totalMatches !== 1 ? 'es' : ''} · ${totalUnassigned} unassigned total`
    : `${totalUnassigned} unassigned tenant${totalUnassigned !== 1 ? 's' : ''}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar links={ownerLinks(pgId)} />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Add Tenant</h1>
        <p className="mt-1 text-sm text-gray-500">
          Unassigned tenants appear below. Search by name, phone, or email, then assign a room.
        </p>

        {message && (
          <div
            className={`mt-4 rounded-lg p-3 text-sm ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <label htmlFor="tenant-search" className="block text-sm font-medium text-gray-700">
            Search tenants
          </label>
          <div className="relative mt-2">
            <input
              id="tenant-search"
              type="search"
              placeholder="Name, phone, or email…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="mt-2 text-xs text-gray-500">{listLabel}</p>
        </div>

        {availableRooms.length === 0 && totalUnassigned > 0 && (
          <p className="mt-4 text-center text-sm text-orange-600">
            All rooms are at full capacity. Add a room or free up a slot first.
          </p>
        )}

        <div className="mt-6 space-y-3">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : tenants.length === 0 ? (
            <p className="rounded-xl bg-white p-8 text-center text-gray-500 shadow-sm">
              {query.trim()
                ? 'No unassigned tenants match your search.'
                : 'No unassigned tenants yet. They must sign up on your site or run the dummy tenant seed script.'}
            </p>
          ) : (
            tenants.map((tenant) => (
              <TenantRow
                key={tenant.uid}
                tenant={tenant}
                availableRooms={availableRooms}
                selectedRoomId={selectedRoom[tenant.uid]}
                onRoomChange={(uid, roomId) =>
                  setSelectedRoom((prev) => ({ ...prev, [uid]: roomId }))
                }
                onAdd={handleAdd}
                adding={addingId === tenant.uid}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
