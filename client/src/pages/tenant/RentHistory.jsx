import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../lib/api';
import { usePGConfig } from '../../hooks/usePGConfig';
import Navbar from '../../components/Navbar';
import { tenantLinks } from '../../lib/navLinks';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

async function downloadReceipt(recordId, type) {
  const res = await api.get(`/api/tenant/receipt/${recordId}?type=${type}`, {
    responseType: 'blob',
  });
  const url = URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `receipt-${recordId.slice(0, 8)}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function TenantRentHistory() {
  const { pgId } = useParams();
  const { config } = usePGConfig();
  const [records, setRecords] = useState([]);
  const [customPayments, setCustomPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const [rentRes, customRes] = await Promise.all([
        api.get('/api/tenant/rent/history'),
        api.get('/api/tenant/payments/custom'),
      ]);
      if (rentRes.data.success) setRecords(rentRes.data.data);
      if (customRes.data.success) setCustomPayments(customRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!document.getElementById('razorpay-script')) {
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handlePayRent = async () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    try {
      setPaying(true);
      setError('');

      const { data } = await api.post('/api/payments/create-order', { month, year });

      if (!data.success) {
        setError(data.error);
        return;
      }

      const { orderId, amount, keyId, devMode } = data.data;

      if (devMode) {
        const confirmed = window.confirm(
          `Razorpay is not configured (dev mode).\n\nMark ₹${amount} rent for ${MONTHS[month - 1]} ${year} as paid?`
        );
        if (!confirmed) return;

        const payRes = await api.post('/api/payments/dev-pay', { month, year });
        if (payRes.data.success) {
          fetchData();
        } else {
          setError(payRes.data.error || 'Failed to record payment');
        }
        return;
      }

      if (!keyId) {
        setError('Online payments are not configured. Pay rent in cash to your PG owner.');
        return;
      }

      const options = {
        key: keyId,
        amount: amount * 100,
        currency: 'INR',
        name: config?.name || 'PG Rent',
        description: `Rent for ${MONTHS[month - 1]} ${year}`,
        order_id: orderId,
        handler: async (response) => {
          try {
            const verifyRes = await api.post('/api/payments/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              month,
              year,
            });
            if (verifyRes.data.success) {
              fetchData();
            } else {
              setError(verifyRes.data.error);
            }
          } catch (err) {
            setError(err.response?.data?.error || 'Payment verification failed');
          }
        },
        theme: { color: config?.primaryColor || '#4F46E5' },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to create payment');
    } finally {
      setPaying(false);
    }
  };

  const handleDownload = async (recordId, type) => {
    try {
      await downloadReceipt(recordId, type);
    } catch {
      setError('Failed to download receipt');
    }
  };

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const currentRecord = records.find((r) => r.month === currentMonth && r.year === currentYear);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar links={tenantLinks(pgId)} />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Rent & Payments</h1>
          {(!currentRecord || currentRecord.status === 'unpaid') && (
            <button
              onClick={handlePayRent}
              disabled={paying}
              className="rounded-lg bg-primary px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              {paying ? 'Processing...' : 'Pay This Month'}
            </button>
          )}
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
        )}

        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            <section className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
              <h2 className="border-b bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-700">Monthly Rent</h2>
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 font-medium text-gray-500">Month</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Amount</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Due</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Paid On</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id} className="border-b">
                      <td className="px-6 py-4 font-medium">
                        {MONTHS[record.month - 1]} {record.year}
                      </td>
                      <td className="px-6 py-4">₹{record.amount}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {record.dueDate ? new Date(record.dueDate).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                          record.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {record.paidAt ? new Date(record.paidAt).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-6 py-4">
                        {record.status === 'paid' && (
                          <button
                            onClick={() => handleDownload(record.id, 'rent')}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Download
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {records.length === 0 && (
                <p className="p-6 text-center text-gray-500">No rent records yet</p>
              )}
            </section>

            <section className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">
              <h2 className="border-b bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-700">Other Charges</h2>
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 font-medium text-gray-500">Title</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Amount</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Due</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                    <th className="px-6 py-3 font-medium text-gray-500">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {customPayments.map((payment) => (
                    <tr key={payment.id} className="border-b">
                      <td className="px-6 py-4 font-medium">{payment.title}</td>
                      <td className="px-6 py-4">₹{payment.amount}</td>
                      <td className="px-6 py-4 text-gray-500">
                        {payment.dueDate ? new Date(payment.dueDate).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                          payment.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {payment.status === 'paid' && (
                          <button
                            onClick={() => handleDownload(payment.id, 'custom')}
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            Download
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {customPayments.length === 0 && (
                <p className="p-6 text-center text-gray-500">No additional charges</p>
              )}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
