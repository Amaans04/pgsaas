import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Button, FAB, ActivityIndicator, Snackbar } from 'react-native-paper';
import api from '../../lib/api';
import PaymentBadge from '../../components/PaymentBadge';
import EmptyState from '../../components/EmptyState';

export default function PaymentsScreen({ navigation }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(null);
  const [snack, setSnack] = useState('');

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/api/owner/payments/summary');
      if (data.success) setSummary(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markPaid = async (tenant) => {
    const now = new Date();
    const month = summary?.month || now.getMonth() + 1;
    const year = summary?.year || now.getFullYear();
    try {
      setMarking(tenant.tenantId);
      const { data } = await api.put('/api/owner/payments/rent', {
        tenantId: tenant.tenantId,
        month,
        year,
        amount: tenant.amount,
        dueDate: tenant.dueDate,
        status: 'paid',
        paymentMethod: 'cash',
      });
      if (data.success) {
        setSnack('Marked as paid');
        load();
      }
    } catch (err) {
      setSnack(err.response?.data?.error || 'Failed to mark paid');
    } finally {
      setMarking(null);
    }
  };

  const tenants = summary?.tenantBreakdown || [];

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={tenants}
        keyExtractor={(item) => item.tenantId}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          summary ? (
            <View style={styles.header}>
              <Text variant="titleMedium">This month</Text>
              <Text variant="bodyMedium">
                Collected ₹{Number(summary.totalPaid || 0).toLocaleString('en-IN')} · Pending ₹{Number(summary.totalPending || 0).toLocaleString('en-IN')}
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <Card style={styles.card} mode="elevated">
            <Card.Content>
              <View style={styles.row}>
                <View>
                  <Text variant="titleSmall">{item.name}</Text>
                  <Text variant="bodySmall">Room {item.roomNumber || '—'} · ₹{Number(item.amount).toLocaleString('en-IN')}</Text>
                </View>
                <PaymentBadge status={item.status} />
              </View>
              {item.status !== 'paid' ? (
                <Button
                  mode="contained-tonal"
                  onPress={() => markPaid(item)}
                  loading={marking === item.tenantId}
                  style={styles.markBtn}
                >
                  Mark cash paid
                </Button>
              ) : null}
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={<EmptyState icon="cash" message="No payment records" />}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePayment')}
        label="Custom"
      />
      <Snackbar visible={!!snack} onDismiss={() => setSnack('')} duration={3000}>
        {snack}
      </Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16, paddingBottom: 88 },
  header: { marginBottom: 16 },
  card: { marginBottom: 12, backgroundColor: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  markBtn: { marginTop: 12 },
  fab: { position: 'absolute', right: 16, bottom: 16, backgroundColor: '#4F46E5' },
});
