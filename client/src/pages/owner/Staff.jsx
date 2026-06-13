import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/api';
import Navbar from '../../components/Navbar';
import { ownerLinks } from '../../lib/navLinks';

export default function OwnerStaff() {
  const { pgId } = useParams();
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(null);
  const [error, setError] = useState('');

  const fetchStaff = async () => {
    try {
      const { data } = await api.get('/api/owner/staff');
      if (data.success) setStaff(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setCreated(null);
    try {
      setCreating(true);
      const { data } = await api.post('/api/owner/staff/create', form);
      if (data.success) {
        setCreated(data.data);
        setForm({ name: '', email: '' });
        fetchStaff();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create staff account');
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (uid) => {
    try {
      const { data } = await api.delete(`/api/owner/staff/${uid}`);
      if (data.success) fetchStaff();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to remove staff');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar links={ownerLinks(pgId)} />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Staff Accounts</h1>
        <p className="mt-1 text-sm text-gray-500">
          Staff can view and resolve complaints and see room occupancy. They cannot access payments or tenant management.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        {created && (
          <div className="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-800">
            <p className="font-semibold">Staff account created for {created.name}</p>
            <p className="mt-2">
              Email: <span className="font-mono">{created.email}</span>
            </p>
            <p>
              Temporary password: <span className="select-all rounded bg-white px-2 py-0.5 font-mono font-bold">{created.tempPassword}</span>
            </p>
            <p className="mt-2 text-green-700">
              Share these with the staff member — they sign in at the Staff Login page. This password is shown only once.
            </p>
          </div>
        )}

        <form onSubmit={handleCreate} className="mt-6 grid gap-3 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-3">
          <input
            type="text"
            placeholder="Full name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          />
          <input
            type="email"
            placeholder="staff@email.com"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            disabled={creating}
            className="rounded-lg bg-primary px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            {creating ? 'Creating...' : 'Create Staff'}
          </button>
        </form>

        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="mt-8 space-y-3">
            {staff.map((member) => (
              <div key={member.uid} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(member.uid)}
                  className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            ))}
            {staff.length === 0 && (
              <p className="text-center text-gray-500">No staff accounts yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
