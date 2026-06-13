import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/api';
import Navbar from '../../components/Navbar';
import { tenantLinks } from '../../lib/navLinks';
import { uploadToImageKit } from '../../lib/imagekitUpload';

const TYPE_OPTIONS = [
  { value: 'id_proof', label: 'ID Proof' },
  { value: 'agreement', label: 'Agreement' },
  { value: 'other', label: 'Other' },
];

export default function TenantDocuments() {
  const { pgId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [type, setType] = useState('id_proof');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const fetchDocuments = async () => {
    try {
      const { data } = await api.get('/api/documents');
      if (data.success) setDocuments(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Choose a file first');
      return;
    }

    try {
      setUploading(true);
      setError('');

      const result = await uploadToImageKit(file);

      const { data } = await api.post('/api/documents', {
        type,
        fileUrl: result.url,
        fileName: result.name,
        fileId: result.fileId,
      });

      if (data.success) {
        setFile(null);
        e.target.reset?.();
        fetchDocuments();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar links={tenantLinks(pgId)} />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload your ID proof, rental agreement, or other documents. Your PG owner can view them.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        <form onSubmit={handleUpload} className="mt-6 grid gap-3 rounded-xl bg-white p-6 shadow-sm sm:grid-cols-3">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2"
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-sm file:font-medium file:text-primary"
          />
          <button
            type="submit"
            disabled={uploading}
            className="rounded-lg bg-primary px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="mt-8 space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
                <div>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-primary hover:underline"
                  >
                    {doc.fileName}
                  </a>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {TYPE_OPTIONS.find((t) => t.value === doc.type)?.label || doc.type} ·{' '}
                    {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-primary">
                  Uploaded
                </span>
              </div>
            ))}
            {documents.length === 0 && (
              <p className="text-center text-gray-500">No documents uploaded yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
