import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Button, TextInput, ActivityIndicator, Snackbar } from 'react-native-paper';
import api from '../../lib/api';
import EmptyState from '../../components/EmptyState';

export default function StaffScreen() {
  const [staff, setStaff] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [snack, setSnack] = useState('');

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/api/owner/staff');
      if (data.success) setStaff(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const createStaff = async () => {
    if (!email.trim() || !name.trim()) {
      setSnack('Enter name and email');
      return;
    }
    try {
      setCreating(true);
      const { data } = await api.post('/api/owner/staff/create', { email: email.trim(), name: name.trim() });
      if (data.success) {
        setEmail('');
        setName('');
        setSnack('Staff account created');
        load();
      } else {
        setSnack(data.error);
      }
    } catch (err) {
      setSnack(err.response?.data?.error || err.message);
    } finally {
      setCreating(false);
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
        data={staff}
        keyExtractor={(item) => item.uid}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Card style={styles.form} mode="elevated">
            <Card.Content>
              <Text variant="titleMedium">Add staff member</Text>
              <TextInput label="Name" value={name} onChangeText={setName} mode="outlined" style={styles.input} />
              <TextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" mode="outlined" style={styles.input} />
              <Button mode="contained" onPress={createStaff} loading={creating}>Create</Button>
            </Card.Content>
          </Card>
        }
        renderItem={({ item }) => (
          <Card style={styles.card} mode="elevated">
            <Card.Content>
              <Text variant="titleSmall">{item.name}</Text>
              <Text variant="bodySmall">{item.email}</Text>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={<EmptyState icon="account-hard-hat" message="No staff yet" />}
      />
      <Snackbar visible={!!snack} onDismiss={() => setSnack('')} duration={3000}>{snack}</Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16 },
  form: { marginBottom: 16, backgroundColor: '#fff' },
  input: { marginBottom: 12, backgroundColor: '#fff' },
  card: { marginBottom: 12, backgroundColor: '#fff' },
});
