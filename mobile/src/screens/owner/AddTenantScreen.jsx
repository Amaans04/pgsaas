import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  TextInput,
  Text,
  ActivityIndicator,
  List,
  Chip,
} from 'react-native-paper';
import api from '../../lib/api';

export default function AddTenantScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [rooms, setRooms] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/owner/rooms').then(({ data }) => {
      if (data.success) setRooms(data.data.filter((r) => r.status !== 'full'));
    });
  }, []);

  const searchUser = async () => {
    const q = phone.replace(/\D/g, '');
    if (q.length < 3) {
      setError('Enter at least 3 digits to search');
      return;
    }
    try {
      setSearching(true);
      setError('');
      const { data } = await api.get('/api/owner/tenants/search', { params: { q: phone } });
      if (data.success) setResults(data.data.results || []);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setSearching(false);
    }
  };

  const handleAssign = async () => {
    if (!selectedUser || !selectedRoom) {
      setError('Select a tenant and room');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const { data } = await api.post('/api/owner/tenants/add', {
        userId: selectedUser.uid,
        roomId: selectedRoom.id,
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
          <TextInput
            label="Search by phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            mode="outlined"
            style={styles.input}
            right={<TextInput.Icon icon="magnify" onPress={searchUser} />}
          />

          {searching ? <ActivityIndicator animating color="#4F46E5" /> : null}

          {results.map((user) => (
            <List.Item
              key={user.uid}
              title={user.name}
              description={user.phone}
              onPress={() => setSelectedUser(user)}
              style={selectedUser?.uid === user.uid ? styles.selected : undefined}
            />
          ))}

          <Text variant="titleSmall" style={styles.section}>Select room</Text>
          <View style={styles.chips}>
            {rooms.map((room) => (
              <Chip
                key={room.id}
                selected={selectedRoom?.id === room.id}
                onPress={() => setSelectedRoom(room)}
                style={styles.chip}
              >
                {room.roomNumber}
              </Chip>
            ))}
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {loading ? (
            <ActivityIndicator animating color="#4F46E5" />
          ) : (
            <Button mode="contained" onPress={handleAssign} style={styles.button}>
              Assign to Room
            </Button>
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
  selected: { backgroundColor: '#E0E7FF' },
  section: { marginTop: 16, marginBottom: 8 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { marginBottom: 4 },
  button: { marginTop: 24 },
  error: { color: '#EF4444', marginVertical: 12 },
});
