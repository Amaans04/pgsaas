import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../../lib/api';
import { usePGConfig } from '../../hooks/usePGConfig';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/Navbar';
import FeatureGate from '../../components/FeatureGate';
import { tenantLinks } from '../../lib/navLinks';

export default function TenantPortal() {
  const { pgId } = useParams();
  const { config } = usePGConfig();
  const { profile, refreshProfile } = useAuth();
  const [moveOutDate, setMoveOutDate] = useState('');
  const [noticeError, setNoticeError] = useState('');
  const [submittingNotice, setSubmittingNotice] = useState(false);
  const [submittingCleaning, setSubmittingCleaning] = useState(false);
  const [cleaningMessage, setCleaningMessage] = useState(null);

  const tenant = profile?.tenant;
  const isAssigned = !!profile?.pgId;

  const handleGiveNotice = async (e) => {
    e.preventDefault();
    setNoticeError('');
    try {
      setSubmittingNotice(true);
      const { data } = await api.post('/api/tenant/notice', { moveOutDate });
      if (data.success) {
        await refreshProfile();
      } else {
        setNoticeError(data.error);
      }
    } catch (err) {
      setNoticeError(err.response?.data?.error || 'Failed to submit notice');
    } finally {
      setSubmittingNotice(false);
    }
  };

  const handleRequestCleaning = async () => {
    setCleaningMessage(null);
    try {
      setSubmittingCleaning(true);
      const description = tenant?.roomNumber
        ? `Room cleaning requested for room ${tenant.roomNumber}`
        : 'Room cleaning requested';

      const { data } = await api.post('/api/tenant/complaints/create', {
        type: 'cleaning',
        description,
      });

      if (data.success) {
        setCleaningMessage({
          type: 'success',
          text: 'Cleaning request sent. Staff will be notified shortly.',
        });
      } else {
        setCleaningMessage({ type: 'error', text: data.error });
      }
    } catch (err) {
      setCleaningMessage({
        type: 'error',
        text: err.response?.data?.error || 'Failed to send cleaning request',
      });
    } finally {
      setSubmittingCleaning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar links={tenantLinks(pgId)} />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome, {profile?.name}
        </h1>
        <p className="mt-2 text-gray-500">{config?.name} — Tenant Portal</p>

        <FeatureGate feature="cleaning">
          {isAssigned && (
            <div className="mt-6">
              <button
                type="button"
                onClick={handleRequestCleaning}
                disabled={submittingCleaning}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-5 text-lg font-semibold text-white shadow-md transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:py-6"
              >
                <span aria-hidden className="text-2xl">🧹</span>
                {submittingCleaning ? 'Sending request...' : 'Request Room Cleaning'}
              </button>
              {cleaningMessage && (
                <p className={`mt-3 text-center text-sm ${
                  cleaningMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {cleaningMessage.text}
                </p>
              )}
            </div>
          )}
        </FeatureGate>

        {!isAssigned && (
          <div className="mt-6 rounded-xl bg-yellow-50 p-6 text-yellow-800">
            <h2 className="font-semibold">You're not assigned to a room yet</h2>
            <p className="mt-1 text-sm">
              Your account is registered. Share your phone number
              {profile?.phone ? ` (${profile.phone})` : ''} with the PG owner — they'll add you to a room,
              and your rent and room details will appear here.
            </p>
          </div>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <PortalCard
            title="Rent & Payments"
            description="View rent history, dues, and download receipts"
            to={`/${pgId}/tenant/rent`}
          />
          <FeatureGate feature="complaints">
            <PortalCard
              title="Complaints"
              description="Raise and track maintenance requests"
              to={`/${pgId}/tenant/complaints`}
            />
          </FeatureGate>
          <PortalCard
            title="Documents"
            description="Upload ID proof, agreements, and more"
            to={`/${pgId}/tenant/documents`}
          />
          <FeatureGate feature="addressImport">
            <PortalCard
              title="Address Import"
              description="Copy your full address for deliveries"
              to={`/${pgId}/tenant/onboarding`}
            />
          </FeatureGate>
        </div>

        {isAssigned && tenant && (
          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-gray-900">Your Stay</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Room</dt>
                <dd className="font-medium">{tenant.roomNumber || 'Not assigned'}</dd>
              </div>
              {tenant.rentAmount && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Monthly Rent</dt>
                  <dd className="font-medium">₹{tenant.rentAmount}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-gray-500">PG Address</dt>
                <dd className="font-medium text-right">{config?.address}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Rent Due Date</dt>
                <dd className="font-medium">{config?.rentDueDate}th of every month</dd>
              </div>
              {tenant.moveInDate && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Moved In</dt>
                  <dd className="font-medium">{new Date(tenant.moveInDate).toLocaleDateString()}</dd>
                </div>
              )}
            </dl>

            <div className="mt-6 border-t pt-4">
              {tenant.status === 'active' && (
                <form onSubmit={handleGiveNotice}>
                  <h3 className="text-sm font-semibold text-gray-900">Planning to move out?</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Submit a notice with your planned move-out date. The owner will confirm it.
                  </p>
                  {noticeError && (
                    <p className="mt-2 text-sm text-red-600">{noticeError}</p>
                  )}
                  <div className="mt-3 flex gap-2">
                    <input
                      type="date"
                      required
                      value={moveOutDate}
                      onChange={(e) => setMoveOutDate(e.target.value)}
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    />
                    <button
                      type="submit"
                      disabled={submittingNotice}
                      className="rounded-lg border border-yellow-500 px-4 py-2 text-sm font-medium text-yellow-700 hover:bg-yellow-50 disabled:opacity-50"
                    >
                      {submittingNotice ? 'Submitting...' : 'Give Notice'}
                    </button>
                  </div>
                </form>
              )}

              {tenant.status === 'notice_period' && (
                <div className="rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
                  <p className="font-semibold">Notice submitted</p>
                  <p className="mt-1">
                    Planned move-out: {tenant.moveOutDate ? new Date(tenant.moveOutDate).toLocaleDateString() : '—'}.
                    The owner will confirm your move-out.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PortalCard({ title, description, to }) {
  return (
    <Link
      to={to}
      className="block rounded-xl bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <h3 className="font-semibold text-primary">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </Link>
  );
}
