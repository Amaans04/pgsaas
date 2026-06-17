import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, TextInput, Text, ActivityIndicator } from 'react-native-paper';
import api from '../../lib/api';

export default function AddRoomScreen({ navigation }) {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [sharingCapacity, setSharingCapacity] = useState('2');
  const [rentAmount, setRentAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await api.post('/api/owner/rooms', {
        roomNumber: roomNumber.trim(),
        roomType: roomType.trim() || null,
        sharingCapacity: Number(sharingCapacity),
        rentAmount: Number(rentAmount),
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
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <TextInput label="Room number" value={roomNumber} onChangeText={setRoomNumber} mode="outlined" style={styles.input} />
          <TextInput label="Room type (optional)" value={roomType} onChangeText={setRoomType} mode="outlined" style={styles.input} />
          <TextInput label="Sharing capacity" value={sharingCapacity} onChangeText={setSharingCapacity} keyboardType="number-pad" mode="outlined" style={styles.input} />
          <TextInput label="Monthly rent (₹)" value={rentAmount} onChangeText={setRentAmount} keyboardType="number-pad" mode="outlined" style={styles.input} />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {loading ? (
            <ActivityIndicator animating color="#4F46E5" />
          ) : (
            <Button mode="contained" onPress={handleSubmit}>Create Room</Button>
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
  input: { marginBottom: 12, backgroundColor: '#fff' },
  error: { color: '#EF4444', marginBottom: 12 },
});
