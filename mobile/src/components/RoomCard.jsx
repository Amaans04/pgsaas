import { View, StyleSheet } from 'react-native';
import { Card, Text, Badge } from 'react-native-paper';
import { ROOM_STATUS_COLORS } from '../config/theme';

export default function RoomCard({ room, onPress }) {
  const status = room.status || 'vacant';
  const color = ROOM_STATUS_COLORS[status] || ROOM_STATUS_COLORS.vacant;

  return (
    <Card style={styles.card} onPress={onPress} mode="elevated">
      <Card.Content>
        <View style={styles.row}>
          <Text variant="titleMedium">Room {room.roomNumber}</Text>
          <Badge style={{ backgroundColor: color }}>{status}</Badge>
        </View>
        <Text variant="bodySmall" style={styles.meta}>
          {room.roomType || 'Standard'} · {room.currentOccupancy || 0}/{room.sharingCapacity} beds
        </Text>
        <Text variant="bodyMedium" style={styles.rent}>
          ₹{Number(room.rentAmount || 0).toLocaleString('en-IN')}/mo
        </Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, backgroundColor: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  meta: { marginTop: 4, color: '#6B7280' },
  rent: { marginTop: 8, fontWeight: '600', color: '#4F46E5' },
});
