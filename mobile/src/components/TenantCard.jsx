import { View, StyleSheet } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';

export default function TenantCard({ tenant, onPress }) {
  const initials = (tenant.name || '?').slice(0, 2).toUpperCase();

  return (
    <Card style={styles.card} onPress={onPress} mode="elevated">
      <Card.Content style={styles.content}>
        <Avatar.Text size={40} label={initials} style={styles.avatar} />
        <View style={styles.info}>
          <Text variant="titleMedium">{tenant.name}</Text>
          <Text variant="bodySmall" style={styles.phone}>{tenant.phone || tenant.email}</Text>
          {tenant.roomNumber && (
            <Text variant="bodySmall">Room {tenant.roomNumber}</Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, backgroundColor: '#fff' },
  content: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { backgroundColor: '#4F46E5' },
  info: { flex: 1 },
  phone: { color: '#6B7280' },
});
