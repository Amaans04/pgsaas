import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge } from 'react-native-paper';

const STATUS_COLORS = {
  open: '#F59E0B',
  in_progress: '#3B82F6',
  resolved: '#10B981',
};

export default function ComplaintCard({ complaint }) {
  const status = complaint.status || 'open';
  const color = STATUS_COLORS[status] || STATUS_COLORS.open;

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <View style={styles.row}>
          <Text variant="titleSmall">{complaint.type || 'General'}</Text>
          <Badge style={{ backgroundColor: color }}>{status.replace('_', ' ')}</Badge>
        </View>
        <Text variant="bodyMedium" style={styles.desc}>{complaint.description}</Text>
        {complaint.tenantName && (
          <Text variant="bodySmall" style={styles.meta}>By {complaint.tenantName}</Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, backgroundColor: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  desc: { marginTop: 8 },
  meta: { marginTop: 4, color: '#6B7280' },
});
