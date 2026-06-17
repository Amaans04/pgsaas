import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chip, ActivityIndicator } from 'react-native-paper';
import api from '../../lib/api';
import ComplaintCard from '../../components/ComplaintCard';
import EmptyState from '../../components/EmptyState';

const FILTERS = ['all', 'open', 'in_progress', 'resolved'];

export default function OwnerComplaintsScreen() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/api/owner/complaints');
      if (data.success) setComplaints(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = filter === 'all'
    ? complaints
    : complaints.filter((c) => c.status === filter);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <Chip
            key={f}
            selected={filter === f}
            onPress={() => setFilter(f)}
            style={styles.chip}
          >
            {f.replace('_', ' ')}
          </Chip>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ComplaintCard complaint={item} />}
        ListEmptyComponent={<EmptyState icon="alert-circle-outline" message="No complaints" />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  filters: { flexDirection: 'row', flexWrap: 'wrap', padding: 16, gap: 8 },
  chip: { marginBottom: 4 },
  list: { paddingHorizontal: 16, paddingBottom: 16 },
});
