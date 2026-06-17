import { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, TextInput, ActivityIndicator } from 'react-native-paper';
import useAuth from '../../hooks/useAuth';
import api from '../../lib/api';

export default function OnboardingScreen() {
  const { user, fetchProfile } = useAuth();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim() || phone.replace(/\D/g, '').length < 10) {
      setError('Enter your name and a valid 10-digit phone number');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const { data } = await api.post('/api/auth/onboard', {
        role: 'tenant',
        phone: phone.replace(/\D/g, ''),
        name: name.trim(),
      });

      if (!data.success) {
        setError(data.error || 'Onboarding failed');
        return;
      }

      await fetchProfile();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Onboarding failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text variant="headlineSmall" style={styles.title}>Complete your profile</Text>
          <Text variant="bodyMedium" style={styles.sub}>
            Add your details to get started as a tenant
          </Text>

          <TextInput
            label="Full name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            mode="outlined"
            style={styles.input}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {loading ? (
            <ActivityIndicator animating color="#4F46E5" />
          ) : (
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
              Continue
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
  content: { padding: 24 },
  title: { fontWeight: '700' },
  sub: { color: '#6B7280', marginTop: 8, marginBottom: 24 },
  input: { marginBottom: 12, backgroundColor: '#fff' },
  button: { marginTop: 8 },
  error: { color: '#EF4444', marginBottom: 12 },
});
