import { useState, useEffect, useCallback, useRef } from 'react';
import api from '../lib/api';

const POLL_MS = 30000;

export function useCleaningNotifications(enabled) {
  const [requests, setRequests] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const knownPendingRef = useRef(null);

  const fetchRequests = useCallback(async () => {
    if (!enabled) return;
    try {
      setLoading(true);
      const { data } = await api.get('/api/owner/cleaning');
      if (!data.success) return;

      const list = data.data.requests || [];
      const pending = list.filter((r) => r.status === 'pending');
      setRequests(list);
      setPendingCount(data.data.pendingCount ?? pending.length);

      const pendingIds = new Set(pending.map((r) => r.id));
      if (knownPendingRef.current !== null) {
        const newOnes = pending.filter((r) => !knownPendingRef.current.has(r.id));
        if (newOnes.length > 0) {
          setToasts((prev) => [
            ...prev,
            ...newOnes.map((r) => ({
              id: r.id,
              tenantName: r.tenantName,
              roomNumber: r.roomNumber,
              createdAt: r.createdAt,
            })),
          ]);
        }
      }
      knownPendingRef.current = pendingIds;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return undefined;
    fetchRequests();
    const interval = setInterval(fetchRequests, POLL_MS);
    return () => clearInterval(interval);
  }, [enabled, fetchRequests]);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const markDone = useCallback(
    async (requestId) => {
      const { data } = await api.post('/api/owner/cleaning/resolve', { requestId });
      if (data.success) {
        dismissToast(requestId);
        await fetchRequests();
      }
      return data;
    },
    [dismissToast, fetchRequests]
  );

  return {
    requests,
    pendingCount,
    toasts,
    loading,
    dismissToast,
    markDone,
    refresh: fetchRequests,
  };
}
