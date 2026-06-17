import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ActivityIndicator } from 'react-native-paper';
import api from '../../lib/api';
import StatCard from '../../components/StatCard';

export default function StaffDashboardScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/api/owner/rooms');
      if (data.success) setRooms(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const totalBeds = rooms.reduce((s, r) => s + (r.sharingCapacity || 0), 0);
  const occupied = rooms.reduce((s, r) => s + (r.currentOccupancy || 0), 0);
  const vacantRooms = rooms.filter((r) => r.status === 'vacant').length;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>Occupancy Overview</Text>
        <View style={styles.statsRow}>
          <StatCard label="Occupied beds" value={`${occupied}/${totalBeds}`} />
          <StatCard label="Vacant rooms" value={String(vacantRooms)} />
        </View>
        <View style={styles.statsRow}>
          <StatCard label="Total rooms" value={String(rooms.length)} />
          <StatCard
            label="Occupancy rate"
            value={totalBeds ? `${Math.round((occupied / totalBeds) * 100)}%` : '0%'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: { padding: 16 },
  title: { fontWeight: '700', marginBottom: 16 },
  statsRow: { flexDirection: 'row', gap: 12 },
});
