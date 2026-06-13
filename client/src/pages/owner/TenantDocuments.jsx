import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/api';
import Navbar from '../../components/Navbar';
import { ownerLinks } from '../../lib/navLinks';

const TYPE_LABELS = {
  id_proof: 'ID Proof',
  agreement: 'Agreement',
  other: 'Other',
};

export default function TenantDocuments() {
  const { pgId } = useParams();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocuments() {
      try {
        const { data } = await api.get('/api/owner/documents');
        if (data.success) setDocuments(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDocuments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar links={ownerLinks(pgId)} />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Tenant Documents</h1>
        <p className="mt-1 text-sm text-gray-500">Documents uploaded by tenants of your PG (read-only).</p>

        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-500">Tenant</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Type</th>
                  <th className="px-6 py-3 font-medium text-gray-500">File</th>
                  <th className="px-6 py-3 font-medium text-gray-500">Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b">
                    <td className="px-6 py-4 font-medium">{doc.tenantName}</td>
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-secondary px-2 py-1 text-xs font-medium text-primary">
                        {TYPE_LABELS[doc.type] || doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline"
                      >
                        {doc.fileName}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {documents.length === 0 && (
              <p className="p-6 text-center text-gray-500">No documents uploaded yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
