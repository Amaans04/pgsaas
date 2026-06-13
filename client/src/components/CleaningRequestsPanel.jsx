import { useState } from 'react';

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return new Date(iso).toLocaleDateString();
}

export default function CleaningRequestsPanel({ requests, onMarkDone, resolvingId }) {
  const [showDone, setShowDone] = useState(false);

  const pending = requests.filter((r) => r.status === 'pending');
  const done = requests.filter((r) => r.status === 'done').slice(0, 8);
  const visible = showDone ? [...pending, ...done] : pending;

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Cleaning requests</h2>
          <p className="text-sm text-gray-500">Live alerts from tenants — not complaints</p>
        </div>
        {pending.length > 0 && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            {pending.length} pending
          </span>
        )}
      </div>

      <div className="mt-4 space-y-2">
        {visible.length === 0 && (
          <div className="rounded-xl bg-gray-50 px-4 py-8 text-center text-sm text-gray-500">
            No pending cleaning requests
          </div>
        )}
        {visible.map((req) => (
          <div
            key={req.id}
            className={`flex flex-col gap-3 rounded-xl border px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${
              req.status === 'pending'
                ? 'border-amber-100 bg-amber-50/50'
                : 'border-gray-100 bg-gray-50/80'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-base shadow-sm">
                🧹
              </span>
              <div className="min-w-0">
                <p className="truncate font-medium text-gray-900">{req.tenantName}</p>
                <p className="text-sm text-gray-500">
                  {req.roomNumber ? `Room ${req.roomNumber}` : 'Room not set'}
                  <span className="mx-1.5 text-gray-300">·</span>
                  {timeAgo(req.createdAt)}
                </p>
              </div>
            </div>
            {req.status === 'pending' ? (
              <button
                type="button"
                disabled={resolvingId === req.id}
                onClick={() => onMarkDone(req.id)}
                className="shrink-0 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
              >
                {resolvingId === req.id ? 'Saving...' : 'Mark done'}
              </button>
            ) : (
              <span className="text-xs font-medium text-green-600">Completed</span>
            )}
          </div>
        ))}
      </div>

      {done.length > 0 && (
        <button
          type="button"
          onClick={() => setShowDone(!showDone)}
          className="mt-3 text-sm font-medium text-primary hover:underline"
        >
          {showDone ? 'Hide completed' : `Show ${done.length} completed`}
        </button>
      )}
    </section>
  );
}
