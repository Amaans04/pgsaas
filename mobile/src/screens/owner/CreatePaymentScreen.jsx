import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput, Text, ActivityIndicator, Menu } from 'react-native-paper';
import api from '../../lib/api';

export default function CreatePaymentScreen({ navigation }) {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/owner/tenants').then(({ data }) => {
      if (data.success) {
        setTenants(data.data.filter((t) => t.status !== 'moved_out'));
      }
    });
  }, []);

  const handleSubmit = async () => {
    if (!selectedTenant || !title.trim() || !amount) {
      setError('Fill all fields');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const { data } = await api.post('/api/owner/payments/custom/create', {
        tenantId: selectedTenant.uid,
        title: title.trim(),
        amount: Number(amount),
      });
      if (!data.success) {
        setError(data.error);
        return;
      }
      navigation.goBack();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.content}>
          <Menu
            visible={menuOpen}
            onDismiss={() => setMenuOpen(false)}
            anchor={
              <Button mode="outlined" onPress={() => setMenuOpen(true)} style={styles.input}>
                {selectedTenant ? selectedTenant.name : 'Select tenant'}
              </Button>
            }
          >
            {tenants.map((t) => (
              <Menu.Item
                key={t.uid}
                onPress={() => {
                  setSelectedTenant(t);
                  setMenuOpen(false);
                }}
                title={`${t.name} (${t.roomNumber || 'no room'})`}
              />
            ))}
          </Menu>

          <TextInput label="Payment title" value={title} onChangeText={setTitle} mode="outlined" style={styles.input} />
          <TextInput label="Amount (₹)" value={amount} onChangeText={setAmount} keyboardType="number-pad" mode="outlined" style={styles.input} />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {loading ? (
            <ActivityIndicator animating color="#4F46E5" />
          ) : (
            <Button mode="contained" onPress={handleSubmit}>Create Payment</Button>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  flex: { flex: 1 },
  content: { padding: 16 },
  input: { marginBottom: 12 },
  error: { color: '#EF4444', marginBottom: 12 },
});
