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
      const { data } = await api.post('/api/tenant/cleaning/request');
      if (data.success) {
        setCleaningMessage({
          type: 'success',
          text: 'Cleaning request sent. Staff will be notified on their dashboard.',
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
    <div className="min-h-screen bg-slate-50">
      <Navbar links={tenantLinks(pgId)} />
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        <p className="text-sm font-medium text-gray-500">{config?.name}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Hi, {profile?.name?.split(' ')[0] || 'there'}
        </h1>

        {!isAssigned && (
          <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50/80 p-5 text-amber-900">
            <h2 className="font-semibold">Waiting for room assignment</h2>
            <p className="mt-1 text-sm text-amber-800/90">
              Share your phone{profile?.phone ? ` (${profile.phone})` : ''} with the owner to get added to a room.
            </p>
          </div>
        )}

        <FeatureGate feature="cleaning">
          {isAssigned && (
            <div className="mt-6">
              <button
                type="button"
                onClick={handleRequestCleaning}
                disabled={submittingCleaning}
                className="group flex w-full items-center gap-4 rounded-2xl border border-indigo-100 bg-white p-5 text-left shadow-sm transition hover:border-indigo-200 hover:shadow-md disabled:opacity-60 sm:p-6"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-2xl transition group-hover:bg-indigo-100">
                  🧹
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-semibold text-gray-900 sm:text-lg">
                    {submittingCleaning ? 'Sending request...' : 'Request room cleaning'}
                  </span>
                  <span className="mt-0.5 block text-sm text-gray-500">
                    Tap to notify staff — not a complaint
                  </span>
                </span>
              </button>
              {cleaningMessage && (
                <p
                  className={`mt-3 text-center text-sm ${
                    cleaningMessage.type === 'success' ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {cleaningMessage.text}
                </p>
              )}
            </div>
          )}
        </FeatureGate>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
          <PortalCard title="Rent & payments" description="History, dues & receipts" to={`/${pgId}/tenant/rent`} />
          <FeatureGate feature="complaints">
            <PortalCard title="Complaints" description="Maintenance & issues" to={`/${pgId}/tenant/complaints`} />
          </FeatureGate>
          <PortalCard title="Documents" description="ID proof & agreements" to={`/${pgId}/tenant/documents`} />
          <FeatureGate feature="addressImport">
            <PortalCard title="Address" description="For deliveries" to={`/${pgId}/tenant/onboarding`} />
          </FeatureGate>
        </div>

        {isAssigned && tenant && (
          <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold text-gray-900">Your stay</h2>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <InfoRow label="Room" value={tenant.roomNumber || 'Not assigned'} />
              {tenant.rentAmount && <InfoRow label="Rent" value={`₹${tenant.rentAmount}/mo`} />}
              <InfoRow label="Due date" value={`${config?.rentDueDate}th monthly`} />
              {tenant.moveInDate && (
                <InfoRow label="Moved in" value={new Date(tenant.moveInDate).toLocaleDateString()} />
              )}
              <div className="sm:col-span-2">
                <dt className="text-gray-500">Address</dt>
                <dd className="mt-0.5 font-medium text-gray-900">{config?.address}</dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-gray-100 pt-5">
              {tenant.status === 'active' && (
                <form onSubmit={handleGiveNotice}>
                  <h3 className="text-sm font-semibold text-gray-900">Move-out notice</h3>
                  <p className="mt-1 text-xs text-gray-500">Submit your planned move-out date.</p>
                  {noticeError && <p className="mt-2 text-sm text-red-600">{noticeError}</p>}
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <input
                      type="date"
                      required
                      value={moveOutDate}
                      onChange={(e) => setMoveOutDate(e.target.value)}
                      className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="submit"
                      disabled={submittingNotice}
                      className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-800 hover:bg-amber-100 disabled:opacity-50"
                    >
                      {submittingNotice ? 'Submitting...' : 'Give notice'}
                    </button>
                  </div>
                </form>
              )}
              {tenant.status === 'notice_period' && (
                <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                  <p className="font-semibold">Notice submitted</p>
                  <p className="mt-1">
                    Move-out:{' '}
                    {tenant.moveOutDate
                      ? new Date(tenant.moveOutDate).toLocaleDateString()
                      : '—'}
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

function InfoRow({ label, value }) {
  return (
    <div>
      <dt className="text-gray-500">{label}</dt>
      <dd className="font-medium text-gray-900">{value}</dd>
    </div>
  );
}

function PortalCard({ title, description, to }) {
  return (
    <Link
      to={to}
      className="block rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-indigo-100 hover:shadow-md"
    >
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </Link>
  );
}
