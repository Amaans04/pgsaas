import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/api';
import Navbar from '../../components/Navbar';
import { ownerLinks } from '../../lib/navLinks';
import EditGeneralPaymentModal from './EditGeneralPaymentModal';

const emptyForm = { tenantId: '', title: '', amount: '', dueDate: '' };

export default function OwnerPayments() {
  const { pgId } = useParams();
  const [summary, setSummary] = useState(null);
  const [customPayments, setCustomPayments] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);

  const fetchAll = async () => {
    try {
      const [summaryRes, customRes, tenantsRes] = await Promise.all([
        api.get('/api/owner/payments/summary'),
        api.get('/api/owner/payments/custom'),
        api.get('/api/owner/tenants'),
      ]);
      if (summaryRes.data.success) setSummary(summaryRes.data.data);
      if (customRes.data.success) setCustomPayments(customRes.data.data);
      if (tenantsRes.data.success) {
        setTenants(tenantsRes.data.data.filter((t) => t.status !== 'moved_out'));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const { data } = await api.post('/api/owner/payments/custom/create', {
        tenantId: form.tenantId,
        title: form.title,
        amount: Number(form.amount),
        dueDate: form.dueDate || null,
      });
      if (data.success) {
        setForm(emptyForm);
        setMessage({ type: 'success', text: 'Payment request created' });
        fetchAll();
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to create payment' });
    }
  };

  const handleMarkPaid = async (paymentId) => {
    try {
      const { data } = await api.post('/api/owner/payments/custom/mark-paid', { paymentId });
      if (data.success) fetchAll();
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Failed to mark as paid' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar links={ownerLinks(pgId)} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>

        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Rent Due This Month</p>
                <p className="mt-1 text-2xl font-bold text-primary">
                  ₹{(summary?.totalDue || 0).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Collected</p>
                <p className="mt-1 text-2xl font-bold text-green-600">
                  ₹{(summary?.totalPaid || 0).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="mt-1 text-2xl font-bold text-red-600">
                  ₹{(summary?.totalPending || 0).toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {message && (
              <div className={`mt-6 rounded-lg p-3 text-sm ${
                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
              }`}>
                {message.text}
              </div>
            )}

            <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
              <section className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">General Payments</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Monthly rent for active tenants. Click a row to edit amount, due date, or mark cash payments.
                </p>
                <div className="mt-4 max-h-[32rem] overflow-y-auto rounded-lg border border-gray-100">
                  <table className="w-full text-left text-sm">
                    <thead className="sticky top-0 border-b bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 font-medium text-gray-500">Tenant</th>
                        <th className="px-4 py-2 font-medium text-gray-500">Room</th>
                        <th className="px-4 py-2 font-medium text-gray-500">Amount</th>
                        <th className="px-4 py-2 font-medium text-gray-500">Due</th>
                        <th className="px-4 py-2 font-medium text-gray-500">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(summary?.tenantBreakdown || []).map((t) => (
                        <tr
                          key={t.tenantId}
                          onClick={() => setEditingPayment(t)}
                          className="cursor-pointer border-b transition hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 font-medium">{t.name}</td>
                          <td className="px-4 py-3">{t.roomNumber || '—'}</td>
                          <td className="px-4 py-3">₹{t.amount}</td>
                          <td className="px-4 py-3">
                            {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '—'}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                              t.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {t.status}
                              {t.status === 'paid' && t.paymentMethod ? ` (${t.paymentMethod})` : ''}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {(summary?.tenantBreakdown || []).length === 0 && (
                    <p className="py-8 text-center text-gray-500">No active tenants</p>
                  )}
                </div>
              </section>

              <section className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-900">Custom Payments</h2>
                <p className="mt-1 text-sm text-gray-500">
                  One-off charges like late fees, maintenance, or event contributions.
                </p>

                <form onSubmit={handleCreate} className="mt-4 grid gap-3 sm:grid-cols-2">
                  <select
                    required
                    value={form.tenantId}
                    onChange={(e) => setForm({ ...form, tenantId: e.target.value })}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm sm:col-span-2"
                  >
                    <option value="">Select tenant</option>
                    {tenants.map((t) => (
                      <option key={t.uid} value={t.uid}>{t.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder='Title e.g. "Late Fee - June"'
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm sm:col-span-2"
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    required
                    min="1"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 sm:col-span-2"
                  >
                    Create
                  </button>
                </form>

                <div className="mt-6 max-h-[24rem] overflow-y-auto rounded-lg border border-gray-100">
                  <table className="w-full text-left text-sm">
                    <thead className="sticky top-0 border-b bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 font-medium text-gray-500">Tenant</th>
                        <th className="px-4 py-2 font-medium text-gray-500">Title</th>
                        <th className="px-4 py-2 font-medium text-gray-500">Amount</th>
                        <th className="px-4 py-2 font-medium text-gray-500">Due</th>
                        <th className="px-4 py-2 font-medium text-gray-500">Status</th>
                        <th className="px-4 py-2 font-medium text-gray-500"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {customPayments.map((p) => (
                        <tr key={p.id} className="border-b">
                          <td className="px-4 py-3 font-medium">{p.tenantName}</td>
                          <td className="px-4 py-3">{p.title}</td>
                          <td className="px-4 py-3">₹{p.amount}</td>
                          <td className="px-4 py-3">{p.dueDate ? new Date(p.dueDate).toLocaleDateString() : '—'}</td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                              p.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {p.status}{p.status === 'paid' && p.paymentMethod ? ` (${p.paymentMethod})` : ''}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {p.status === 'unpaid' && (
                              <button
                                onClick={() => handleMarkPaid(p.id)}
                                className="rounded border border-green-600 px-3 py-1 text-xs font-medium text-green-700 hover:bg-green-50"
                              >
                                Mark Paid (Cash)
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {customPayments.length === 0 && (
                    <p className="py-8 text-center text-gray-500">No custom payments yet</p>
                  )}
                </div>
              </section>
            </div>

            {editingPayment && (
              <EditGeneralPaymentModal
                payment={editingPayment}
                month={summary?.month}
                year={summary?.year}
                onClose={() => setEditingPayment(null)}
                onSaved={() => {
                  setMessage({ type: 'success', text: 'Rent payment updated' });
                  fetchAll();
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
