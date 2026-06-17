import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Button, ActivityIndicator, Snackbar } from 'react-native-paper';
import api from '../../lib/api';
import ComplaintCard from '../../components/ComplaintCard';
import EmptyState from '../../components/EmptyState';

export default function StaffComplaintsScreen() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState(null);
  const [snack, setSnack] = useState('');

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/api/owner/complaints');
      if (data.success) setComplaints(data.data.filter((c) => c.status !== 'resolved'));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const resolve = async (id) => {
    try {
      setResolving(id);
      const { data } = await api.post('/api/owner/complaints/resolve', {
        complaintId: id,
        status: 'resolved',
      });
      if (data.success) {
        setSnack('Complaint resolved');
        load();
      } else {
        setSnack(data.error);
      }
    } catch (err) {
      setSnack(err.response?.data?.error || err.message);
    } finally {
      setResolving(null);
    }
  };

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
        data={complaints}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View>
            <ComplaintCard complaint={item} />
            <Button
              mode="contained"
              onPress={() => resolve(item.id)}
              loading={resolving === item.id}
              style={styles.resolveBtn}
            >
              Mark resolved
            </Button>
          </View>
        )}
        ListEmptyComponent={<EmptyState icon="check-circle" message="All complaints resolved" />}
      />
      <Snackbar visible={!!snack} onDismiss={() => setSnack('')} duration={3000}>{snack}</Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16 },
  resolveBtn: { marginTop: -4, marginBottom: 16 },
});
