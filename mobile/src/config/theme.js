import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4F46E5',
    secondary: '#E0E7FF',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    error: '#EF4444',
  },
};

export const ROOM_STATUS_COLORS = {
  vacant: '#10B981',
  partial: '#F59E0B',
  full: '#EF4444',
};

export const PAYMENT_STATUS_COLORS = {
  paid: '#10B981',
  unpaid: '#F59E0B',
  overdue: '#EF4444',
};
