import { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ActivityIndicator, Button } from 'react-native-paper';
import { CartesianChart, Bar } from 'victory-native';
import api from '../../lib/api';
import StatCard from '../../components/StatCard';
import useAuth from '../../hooks/useAuth';

export default function OwnerDashboardScreen({ navigation }) {
  const { profile } = useAuth();
  const [summary, setSummary] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const [summaryRes, roomsRes] = await Promise.all([
        api.get('/api/owner/payments/summary'),
        api.get('/api/owner/rooms'),
      ]);
      if (summaryRes.data.success) setSummary(summaryRes.data.data);
      if (roomsRes.data.success) setRooms(roomsRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onRefresh = () => {
    setRefreshing(true);
    load();
  };

  const totalBeds = rooms.reduce((s, r) => s + (r.sharingCapacity || 0), 0);
  const occupied = rooms.reduce((s, r) => s + (r.currentOccupancy || 0), 0);
  const occupancyPct = totalBeds ? Math.round((occupied / totalBeds) * 100) : 0;

  const chartData = summary
    ? [
        { label: 'Collected', value: summary.totalPaid || 0 },
        { label: 'Pending', value: summary.totalPending || 0 },
      ]
    : [];

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text variant="headlineSmall" style={styles.title}>
          {profile?.pg?.name || 'Dashboard'}
        </Text>

        <View style={styles.statsRow}>
          <StatCard
            label="Collected"
            value={`₹${Number(summary?.totalPaid || 0).toLocaleString('en-IN')}`}
          />
          <StatCard
            label="Pending"
            value={`₹${Number(summary?.totalPending || 0).toLocaleString('en-IN')}`}
          />
        </View>
        <View style={styles.statsRow}>
          <StatCard label="Occupancy" value={`${occupancyPct}%`} subtitle={`${occupied}/${totalBeds} beds`} />
          <StatCard label="Unpaid tenants" value={String(summary?.tenantBreakdown?.filter((t) => t.status !== 'paid').length || 0)} />
        </View>

        {chartData.length > 0 && (
          <View style={styles.chartBox}>
            <Text variant="titleMedium" style={styles.chartTitle}>Revenue this month</Text>
            <View style={styles.chart}>
              <CartesianChart
                data={chartData}
                xKey="label"
                yKeys={['value']}
                domainPadding={{ left: 20, right: 20, top: 20 }}
              >
                {({ points, chartBounds }) => (
                  <Bar
                    points={points.value}
                    chartBounds={chartBounds}
                    color="#4F46E5"
                    roundedCorners={{ topLeft: 4, topRight: 4 }}
                  />
                )}
              </CartesianChart>
            </View>
          </View>
        )}

        <Button mode="outlined" onPress={() => navigation.navigate('Staff')} style={styles.staffBtn}>
          Manage Staff
        </Button>
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
  chartBox: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginTop: 8, marginBottom: 16 },
  chartTitle: { marginBottom: 8 },
  chart: { height: 200 },
  staffBtn: { marginTop: 8 },
});
