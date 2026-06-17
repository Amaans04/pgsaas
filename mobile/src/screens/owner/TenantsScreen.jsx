import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB, Searchbar, ActivityIndicator } from 'react-native-paper';
import api from '../../lib/api';
import TenantCard from '../../components/TenantCard';
import EmptyState from '../../components/EmptyState';

export default function TenantsScreen({ navigation }) {
  const [tenants, setTenants] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/api/owner/tenants');
      if (data.success) {
        setTenants(data.data.filter((t) => t.status !== 'moved_out'));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = tenants.filter((t) => {
    const q = query.toLowerCase();
    return (
      (t.name || '').toLowerCase().includes(q) ||
      (t.phone || '').includes(q.replace(/\s/g, ''))
    );
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator animating size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Searchbar placeholder="Search by phone or name" value={query} onChangeText={setQuery} style={styles.search} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.uid}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <TenantCard tenant={item} />}
        ListEmptyComponent={<EmptyState icon="account-group" message="No tenants found" />}
      />
      <FAB icon="plus" style={styles.fab} onPress={() => navigation.navigate('AddTenant')} label="Assign" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  search: { margin: 16, marginBottom: 0, backgroundColor: '#fff' },
  list: { padding: 16, paddingBottom: 88 },
  fab: { position: 'absolute', right: 16, bottom: 16, backgroundColor: '#4F46E5' },
});
