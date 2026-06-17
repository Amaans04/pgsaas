import { Badge } from 'react-native-paper';
import { PAYMENT_STATUS_COLORS } from '../config/theme';

export default function PaymentBadge({ status }) {
  const normalized = status === 'overdue' ? 'overdue' : status === 'paid' ? 'paid' : 'unpaid';
  const color = PAYMENT_STATUS_COLORS[normalized];

  return (
    <Badge style={{ backgroundColor: color }}>
      {normalized.charAt(0).toUpperCase() + normalized.slice(1)}
    </Badge>
  );
}
