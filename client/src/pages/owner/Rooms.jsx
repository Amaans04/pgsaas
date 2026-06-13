import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/api';
import Navbar from '../../components/Navbar';
import { ownerLinks } from '../../lib/navLinks';
import { ROOM_STATUS_STYLES, getSharingCapacity, getRoomStatus } from '../../lib/room';
import EditRoomModal from './EditRoomModal';

const emptyRoom = { roomNumber: '', roomType: '', sharingCapacity: '', rentAmount: '' };

export default function OwnerRooms() {
  const { pgId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRoom, setNewRoom] = useState(emptyRoom);
  const [error, setError] = useState('');
  const [editingRoom, setEditingRoom] = useState(null);

  const fetchRooms = async () => {
    try {
      const { data } = await api.get('/api/owner/rooms');
      if (data.success) setRooms(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDeleteRoom = async (room) => {
    if (!room?.id) {
      setError('Cannot delete this room — missing room id. Refresh the page and try again.');
      return;
    }

    if ((room.currentOccupancy || 0) > 0) {
      setError(`Room ${room.roomNumber} still has tenants. Remove them before deleting.`);
      return;
    }

    if (!window.confirm(`Delete room ${room.roomNumber}? This cannot be undone.`)) return;

    setError('');
    try {
      const { data } = await api.delete('/api/owner/rooms', { params: { roomId: room.id } });
      if (data.success) {
        fetchRooms();
      } else {
        setError(data.error || 'Failed to delete room');
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to delete room');
    }
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/api/owner/rooms', {
        roomNumber: newRoom.roomNumber,
        roomType: newRoom.roomType || null,
        sharingCapacity: Number(newRoom.sharingCapacity),
        rentAmount: Number(newRoom.rentAmount),
      });
      if (data.success) {
        setNewRoom(emptyRoom);
        fetchRooms();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add room');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar links={ownerLinks(pgId)} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Rooms</h1>
        <p className="mt-1 text-sm text-gray-500">
          Rent is per tenant. Sharing capacity controls how many tenants can share the room.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <form onSubmit={handleAddRoom} className="mt-6 grid gap-4 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Room Number</label>
            <input
              type="text"
              placeholder="e.g. 101"
              required
              value={newRoom.roomNumber}
              onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Room Type</label>
            <select
              value={newRoom.roomType}
              onChange={(e) => setNewRoom({ ...newRoom, roomType: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
            >
              <option value="">Select type</option>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Triple">Triple</option>
              <option value="Dormitory">Dormitory</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Sharing Capacity</label>
            <input
              type="number"
              placeholder="2"
              required
              min="1"
              value={newRoom.sharingCapacity}
              onChange={(e) => setNewRoom({ ...newRoom, sharingCapacity: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-500">Rent per Tenant (₹)</label>
            <input
              type="number"
              placeholder="8000"
              required
              min="1"
              value={newRoom.rentAmount}
              onChange={(e) => setNewRoom({ ...newRoom, rentAmount: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full rounded-lg bg-primary px-4 py-2 font-medium text-white hover:opacity-90">
              Add Room
            </button>
          </div>
        </form>

        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-500">Room</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Type</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Rent / Tenant</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Occupancy</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id} className="border-b">
                    <td className="px-6 py-4 font-medium">{room.roomNumber}</td>
                    <td className="px-6 py-4">{room.roomType || '—'}</td>
                    <td className="px-6 py-4">₹{room.rentAmount}</td>
                    <td className="px-6 py-4">
                      {room.currentOccupancy || 0} / {getSharingCapacity(room)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${ROOM_STATUS_STYLES[getRoomStatus(room)] || 'bg-gray-100 text-gray-600'}`}>
                        {getRoomStatus(room)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingRoom(room)}
                          className="rounded-lg border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteRoom(room)}
                          disabled={(room.currentOccupancy || 0) > 0}
                          title={
                            (room.currentOccupancy || 0) > 0
                              ? 'Remove all tenants before deleting this room'
                              : 'Delete room'
                          }
                          className="rounded-lg border border-red-300 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rooms.length === 0 && (
              <p className="p-6 text-center text-gray-500">No rooms yet. Add your first room above.</p>
            )}
          </div>
        )}
      </div>

      {editingRoom && (
        <EditRoomModal
          room={editingRoom}
          onClose={() => setEditingRoom(null)}
          onSaved={fetchRooms}
        />
      )}
    </div>
  );
}
