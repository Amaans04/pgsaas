import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/api';
import Navbar from '../../components/Navbar';
import FeatureGate from '../../components/FeatureGate';
import { tenantLinks } from '../../lib/navLinks';

const TYPES = ['cleaning', 'maintenance', 'other'];

export default function TenantComplaints() {
  const { pgId } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ type: 'maintenance', description: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchComplaints = async () => {
    try {
      const { data } = await api.get('/api/tenant/complaints');
      if (data.success) setComplaints(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError('');
      const { data } = await api.post('/api/tenant/complaints/create', form);
      if (data.success) {
        setForm({ type: 'maintenance', description: '' });
        fetchComplaints();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit complaint');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FeatureGate feature="complaints">
      <div className="min-h-screen bg-gray-50">
        <Navbar links={tenantLinks(pgId)} />
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">Complaints</h1>

          <form onSubmit={handleSubmit} className="mt-6 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-gray-900">Raise a Complaint</h2>
            {error && (
              <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
            )}
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 capitalize focus:border-primary focus:outline-none"
                >
                  {TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary focus:outline-none"
                  placeholder="Describe the issue..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-primary px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Complaint'}
              </button>
            </div>
          </form>

          {loading ? (
            <div className="mt-8 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              <h2 className="font-semibold text-gray-900">Your Complaints</h2>
              {complaints.map((complaint) => (
                <div key={complaint.id} className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-primary capitalize">
                      {complaint.type}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                      complaint.status === 'resolved' ? 'bg-green-100 text-green-700' :
                      complaint.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {complaint.status}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{complaint.description}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(complaint.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
              {complaints.length === 0 && (
                <p className="text-gray-500">No complaints raised yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </FeatureGate>
  );
}
