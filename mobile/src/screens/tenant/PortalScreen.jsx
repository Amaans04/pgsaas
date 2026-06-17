import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Button, ActivityIndicator } from 'react-native-paper';
import api from '../../lib/api';
import useAuth from '../../hooks/useAuth';
import PaymentBadge from '../../components/PaymentBadge';

export default function PortalScreen({ navigation }) {
  const { profile } = useAuth();
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/api/auth/me');
      if (data.success) setMe(data.data);
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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating size="large" color="#4F46E5" />
      </View>
    );
  }

  const tenant = me?.tenant || profile?.tenant;
  const pg = me?.pg || profile?.pg;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); load(); }} />}
      >
        <Text variant="headlineSmall" style={styles.title}>
          Welcome, {me?.name || profile?.name || 'Tenant'}
        </Text>

        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <Text variant="titleMedium">{pg?.name || 'Your PG'}</Text>
            {tenant?.roomNumber ? (
              <Text variant="bodyLarge" style={styles.room}>Room {tenant.roomNumber}</Text>
            ) : (
              <Text variant="bodyMedium" style={styles.muted}>Not assigned to a room yet</Text>
            )}
            {tenant?.rentAmount ? (
              <Text variant="bodyMedium">Monthly rent: ₹{Number(tenant.rentAmount).toLocaleString('en-IN')}</Text>
            ) : null}
          </Card.Content>
        </Card>

        <Card style={styles.card} mode="elevated">
          <Card.Content>
            <View style={styles.row}>
              <Text variant="titleMedium">Current rent</Text>
              <PaymentBadge status="unpaid" />
            </View>
            <Text variant="bodySmall" style={styles.muted}>Online payment</Text>
            <Button mode="contained" disabled style={styles.payBtn}>
              Pay Rent — Coming Soon
            </Button>
          </Card.Content>
        </Card>

        <Button mode="outlined" onPress={() => navigation.navigate('AddressImport')}>
          Import address from delivery apps
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
  card: { marginBottom: 16, backgroundColor: '#fff' },
  room: { marginVertical: 8, color: '#4F46E5', fontWeight: '600' },
  muted: { color: '#6B7280', marginTop: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  payBtn: { marginTop: 12 },
});
