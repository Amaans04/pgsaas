import { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, ActivityIndicator } from 'react-native-paper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../config/firebase';
import useAuth from '../../hooks/useAuth';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

export default function LoginScreen() {
  const { fetchProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');

      if (Platform.OS === 'web') {
        setError('Use the web app for browser sign-in.');
        return;
      }

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error('Google sign-in did not return a token');
      }

      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      await fetchProfile();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>PGApp</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Smart PG management for owners and tenants
        </Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {loading ? (
          <ActivityIndicator animating size="large" color="#4F46E5" />
        ) : (
          <Button
            mode="contained"
            icon="google"
            onPress={handleGoogleSignIn}
            style={styles.button}
          >
            Sign in with Google
          </Button>
        )}

        <Text variant="bodySmall" style={styles.hint}>
          Use the same account as the web app. Google Sign-In requires an EAS development build.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontWeight: '700', color: '#4F46E5', textAlign: 'center' },
  subtitle: { textAlign: 'center', color: '#6B7280', marginTop: 8, marginBottom: 32 },
  button: { marginTop: 8 },
  error: { color: '#EF4444', textAlign: 'center', marginBottom: 12 },
  hint: { textAlign: 'center', color: '#9CA3AF', marginTop: 24 },
});
