import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useCleaningNotifications } from '../hooks/useCleaningNotifications';
import NotificationToast from '../components/NotificationToast';

const CleaningNotificationContext = createContext(null);

export function CleaningNotificationProvider({ children }) {
  const { isAuthenticated, role, isAdmin } = useAuth();
  const enabled =
    isAuthenticated && (role === 'staff' || (role === 'owner' && isAdmin));

  const notifications = useCleaningNotifications(enabled);

  return (
    <CleaningNotificationContext.Provider value={enabled ? notifications : null}>
      {enabled && (
        <NotificationToast
          toasts={notifications.toasts}
          onDismiss={notifications.dismissToast}
          onMarkDone={notifications.markDone}
        />
      )}
      {children}
    </CleaningNotificationContext.Provider>
  );
}

export function useCleaningAlerts() {
  return useContext(CleaningNotificationContext);
}
