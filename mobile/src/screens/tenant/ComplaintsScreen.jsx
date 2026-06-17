import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FAB,
  Portal,
  Dialog,
  TextInput,
  Button,
  ActivityIndicator,
  Snackbar,
} from 'react-native-paper';
import api from '../../lib/api';
import ComplaintCard from '../../components/ComplaintCard';
import EmptyState from '../../components/EmptyState';

export default function TenantComplaintsScreen() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [snack, setSnack] = useState('');

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/api/tenant/complaints');
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

  const submit = async () => {
    if (!type.trim() || !description.trim()) {
      setSnack('Fill in type and description');
      return;
    }
    try {
      setSubmitting(true);
      const { data } = await api.post('/api/tenant/complaints/create', {
        type: type.trim(),
        description: description.trim(),
      });
      if (data.success) {
        setDialogOpen(false);
        setType('');
        setDescription('');
        load();
      } else {
        setSnack(data.error);
      }
    } catch (err) {
      setSnack(err.response?.data?.error || err.message);
    } finally {
      setSubmitting(false);
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
        renderItem={({ item }) => <ComplaintCard complaint={item} />}
        ListEmptyComponent={<EmptyState icon="alert-circle-outline" message="No complaints yet" />}
      />
      <FAB icon="plus" style={styles.fab} onPress={() => setDialogOpen(true)} label="Raise" />
      <Portal>
        <Dialog visible={dialogOpen} onDismiss={() => setDialogOpen(false)}>
          <Dialog.Title>New complaint</Dialog.Title>
          <Dialog.Content>
            <TextInput label="Type (e.g. Plumbing)" value={type} onChangeText={setType} mode="outlined" style={styles.input} />
            <TextInput label="Description" value={description} onChangeText={setDescription} multiline numberOfLines={4} mode="outlined" style={styles.input} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogOpen(false)}>Cancel</Button>
            <Button onPress={submit} loading={submitting}>Submit</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Snackbar visible={!!snack} onDismiss={() => setSnack('')} duration={3000}>{snack}</Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16, paddingBottom: 88 },
  fab: { position: 'absolute', right: 16, bottom: 16, backgroundColor: '#4F46E5' },
  input: { marginBottom: 12, backgroundColor: '#fff' },
});
