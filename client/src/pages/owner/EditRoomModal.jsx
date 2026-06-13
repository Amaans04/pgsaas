import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { getSharingCapacity } from '../../lib/room';

export default function EditRoomModal({ room, onClose, onSaved }) {
  const [form, setForm] = useState({
    roomNumber: room.roomNumber || '',
    roomType: room.roomType || '',
    sharingCapacity: getSharingCapacity(room),
    rentAmount: room.rentAmount ?? room.rent ?? '',
  });
  const [members, setMembers] = useState([]);
  const [assignable, setAssignable] = useState([]);
  const [otherRooms, setOtherRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [addTenantId, setAddTenantId] = useState('');
  const [moveTargets, setMoveTargets] = useState({});

  const loadDetail = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await api.get('/api/owner/rooms/detail', { params: { roomId: room.id } });
      if (data.success) {
        const r = data.data.room;
        setForm({
          roomNumber: r.roomNumber || '',
          roomType: r.roomType || '',
          sharingCapacity: getSharingCapacity(r),
          rentAmount: r.rentAmount ?? '',
        });
        setMembers(data.data.members);
        setAssignable(data.data.assignable);
        setOtherRooms(data.data.otherRooms.filter((x) => x.available));
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load room details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [room.id]);

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError('');
      const { data } = await api.put('/api/owner/rooms', form, { params: { roomId: room.id } });
      if (data.success) {
        onSaved();
        await loadDetail();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update room');
    } finally {
      setSaving(false);
    }
  };

  const runMemberAction = async (body) => {
    try {
      setSaving(true);
      setError('');
      const { data } = await api.post('/api/owner/rooms/members', body);
      if (data.success) {
        onSaved();
        setAddTenantId('');
        await loadDetail();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Action failed');
    } finally {
      setSaving(false);
    }
  };

  const handleAddMember = () => {
    if (!addTenantId) {
      setError('Select a tenant to add');
      return;
    }
    runMemberAction({ action: 'add', roomId: room.id, tenantId: addTenantId });
  };

  const handleRemoveMember = (tenantId, name) => {
    if (!window.confirm(`Remove ${name} from this room? They stay in your PG and can be reassigned.`)) return;
    runMemberAction({ action: 'remove', roomId: room.id, tenantId });
  };

  const handleMoveMember = (tenantId) => {
    const targetRoomId = moveTargets[tenantId];
    if (!targetRoomId) {
      setError('Select a target room for the move');
      return;
    }
    runMemberAction({ action: 'move', roomId: room.id, tenantId, targetRoomId });
  };

  const atCapacity = members.length >= Number(form.sharingCapacity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Edit Room {room.roomNumber}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-sm text-gray-500 hover:bg-gray-100"
          >
            Close
          </button>
        </div>

        <div className="space-y-6 p-6">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <>
              <form onSubmit={handleSaveDetails} className="space-y-4 rounded-xl border border-gray-200 p-4">
                <h3 className="font-medium text-gray-900">Room details</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">Room Number</label>
                    <input
                      required
                      value={form.roomNumber}
                      onChange={(e) => setForm({ ...form, roomNumber: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">Room Type</label>
                    <select
                      value={form.roomType}
                      onChange={(e) => setForm({ ...form, roomType: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
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
                      required
                      min={members.length || 1}
                      value={form.sharingCapacity}
                      onChange={(e) => setForm({ ...form, sharingCapacity: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      Min {members.length} (current members)
                    </p>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">Rent per Tenant (₹)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={form.rentAmount}
                      onChange={(e) => setForm({ ...form, rentAmount: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Details'}
                </button>
              </form>

              <section className="rounded-xl border border-gray-200 p-4">
                <h3 className="font-medium text-gray-900">
                  Room members ({members.length}/{form.sharingCapacity})
                </h3>

                {members.length === 0 ? (
                  <p className="mt-3 text-sm text-gray-500">No tenants in this room yet.</p>
                ) : (
                  <ul className="mt-3 space-y-3">
                    {members.map((member) => (
                      <li
                        key={member.uid}
                        className="flex flex-col gap-2 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.phone} · {member.email}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <select
                            value={moveTargets[member.uid] || ''}
                            onChange={(e) =>
                              setMoveTargets({ ...moveTargets, [member.uid]: e.target.value })
                            }
                            className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs"
                          >
                            <option value="">Move to...</option>
                            {otherRooms.map((r) => (
                              <option key={r.id} value={r.id}>
                                Room {r.roomNumber} ({r.currentOccupancy}/{r.sharingCapacity})
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            disabled={saving}
                            onClick={() => handleMoveMember(member.uid)}
                            className="rounded-lg border border-gray-300 px-2 py-1.5 text-xs font-medium hover:bg-white disabled:opacity-50"
                          >
                            Move
                          </button>
                          <button
                            type="button"
                            disabled={saving}
                            onClick={() => handleRemoveMember(member.uid, member.name)}
                            className="rounded-lg border border-red-300 px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {!atCapacity && (
                  <div className="mt-4 flex flex-col gap-2 border-t pt-4 sm:flex-row">
                    <select
                      value={addTenantId}
                      onChange={(e) => setAddTenantId(e.target.value)}
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    >
                      <option value="">Add tenant to this room...</option>
                      {assignable.map((t) => (
                        <option key={t.uid} value={t.uid}>
                          {t.name} — {t.phone}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      disabled={saving || assignable.length === 0}
                      onClick={handleAddMember}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                    >
                      Add
                    </button>
                  </div>
                )}

                {atCapacity && (
                  <p className="mt-3 text-xs text-orange-600">Room is full. Increase capacity or move someone out to add more.</p>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
