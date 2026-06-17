import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Button, ActivityIndicator, Snackbar } from 'react-native-paper';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { encode as base64Encode } from 'base-64';
import api from '../../lib/api';
import PaymentBadge from '../../components/PaymentBadge';
import EmptyState from '../../components/EmptyState';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function RentHistoryScreen() {
  const [records, setRecords] = useState([]);
  const [custom, setCustom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(null);
  const [snack, setSnack] = useState('');

  const load = useCallback(async () => {
    try {
      const [rentRes, customRes] = await Promise.all([
        api.get('/api/tenant/rent/history'),
        api.get('/api/tenant/payments/custom'),
      ]);
      if (rentRes.data.success) setRecords(rentRes.data.data);
      if (customRes.data.success) setCustom(customRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const downloadReceipt = async (recordId, type = 'rent') => {
    try {
      setDownloading(recordId);
      const response = await api.get(`/api/tenant/receipt/${recordId}?type=${type}`, {
        responseType: 'arraybuffer',
      });

      const bytes = new Uint8Array(response.data);
      let binary = '';
      bytes.forEach((b) => {
        binary += String.fromCharCode(b);
      });
      const base64 = base64Encode(binary);

      const fileUri = `${FileSystem.cacheDirectory}receipt-${recordId}.pdf`;
      await FileSystem.writeAsStringAsync(fileUri, base64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, { mimeType: 'application/pdf', dialogTitle: 'Receipt' });
      } else {
        setSnack('Receipt saved');
      }
    } catch (err) {
      setSnack(err.response?.data?.error || err.message || 'Download failed');
    } finally {
      setDownloading(null);
    }
  };

  const allRecords = [
    ...records.map((r) => ({ ...r, kind: 'rent', label: `${MONTHS[(r.month || 1) - 1]} ${r.year}` })),
    ...custom.map((r) => ({ ...r, kind: 'custom', label: r.title })),
  ].sort((a, b) => new Date(b.dueDate || b.createdAt) - new Date(a.dueDate || a.createdAt));

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
        data={allRecords}
        keyExtractor={(item) => `${item.kind}-${item.id}`}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card} mode="elevated">
            <Card.Content>
              <View style={styles.row}>
                <View>
                  <Text variant="titleSmall">{item.label}</Text>
                  <Text variant="bodySmall">₹{Number(item.amount).toLocaleString('en-IN')}</Text>
                </View>
                <PaymentBadge status={item.status} />
              </View>
              {item.status === 'paid' ? (
                <Button
                  mode="outlined"
                  onPress={() => downloadReceipt(item.id, item.kind === 'custom' ? 'custom' : 'rent')}
                  loading={downloading === item.id}
                  style={styles.btn}
                >
                  Download receipt
                </Button>
              ) : (
                <Button mode="contained" disabled style={styles.btn}>
                  Pay — Coming Soon
                </Button>
              )}
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={<EmptyState icon="receipt" message="No rent history yet" />}
      />
      <Snackbar visible={!!snack} onDismiss={() => setSnack('')} duration={3000}>{snack}</Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16 },
  card: { marginBottom: 12, backgroundColor: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  btn: { marginTop: 12 },
});
