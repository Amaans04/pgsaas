import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function StatCard({ label, value, subtitle }) {
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content>
        <Text variant="labelMedium" style={styles.label}>{label}</Text>
        <Text variant="headlineSmall" style={styles.value}>{value}</Text>
        {subtitle ? <Text variant="bodySmall" style={styles.sub}>{subtitle}</Text> : null}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, minWidth: '45%', backgroundColor: '#fff', marginBottom: 12 },
  label: { color: '#6B7280' },
  value: { fontWeight: '700', color: '#111827', marginTop: 4 },
  sub: { color: '#9CA3AF', marginTop: 2 },
});
