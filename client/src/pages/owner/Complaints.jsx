import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/api';
import Navbar from '../../components/Navbar';
import FeatureGate from '../../components/FeatureGate';
import { ownerLinks } from '../../lib/navLinks';

const STATUS_OPTIONS = ['open', 'in-progress', 'resolved'];

export default function OwnerComplaints() {
  const { pgId } = useParams();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const { data } = await api.get('/api/owner/complaints');
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

  const handleResolve = async (complaintId, status) => {
    try {
      const { data } = await api.post('/api/owner/complaints/resolve', { complaintId, status });
      if (data.success) fetchComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FeatureGate feature="complaints">
      <div className="min-h-screen bg-gray-50">
        <Navbar links={ownerLinks(pgId)} />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">Complaints</h1>

          {loading ? (
            <div className="mt-8 flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="rounded-xl bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-primary capitalize">
                          {complaint.type}
                        </span>
                        <span className="text-sm text-gray-500">by {complaint.tenantName}</span>
                      </div>
                      <p className="mt-2 text-gray-700">{complaint.description}</p>
                      <p className="mt-1 text-xs text-gray-400">
                        {new Date(complaint.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <select
                      value={complaint.status}
                      onChange={(e) => handleResolve(complaint.id, e.target.value)}
                      className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm capitalize"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
              {complaints.length === 0 && (
                <p className="text-center text-gray-500">No complaints yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </FeatureGate>
  );
}
