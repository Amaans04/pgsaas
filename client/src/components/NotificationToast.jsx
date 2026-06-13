export default function NotificationToast({ toasts, onDismiss, onMarkDone }) {
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-3 px-4 sm:items-end sm:pr-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto w-full max-w-sm animate-slide-in rounded-2xl border border-indigo-100 bg-white p-4 shadow-lg ring-1 ring-black/5"
          role="alert"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-lg">
              🧹
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-gray-900">Cleaning requested</p>
              <p className="mt-0.5 text-sm text-gray-600">
                {toast.tenantName}
                {toast.roomNumber ? ` · Room ${toast.roomNumber}` : ''}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {new Date(toast.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="shrink-0 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => onMarkDone(toast.id)}
              className="flex-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white hover:opacity-90"
            >
              Mark done
            </button>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
            >
              Later
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
