import { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider, Button } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthContext';
import useAuth from './src/hooks/useAuth';
import { theme } from './src/config/theme';
import LoginScreen from './src/screens/auth/LoginScreen';
import OnboardingScreen from './src/screens/auth/OnboardingScreen';
import OwnerNavigator from './src/navigation/OwnerNavigator';
import TenantNavigator from './src/navigation/TenantNavigator';
import StaffNavigator from './src/navigation/StaffNavigator';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { role, signOut } = useAuth();

  if (role === 'owner') {
    return <OwnerNavigator />;
  }
  if (role === 'staff') {
    return <StaffNavigator />;
  }
  return <TenantNavigator />;
}

function RootNavigator() {
  const { user, loading, isOnboarded } = useAuth();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : !isOnboarded ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={MainNavigator}
            options={{
              headerShown: true,
              headerRight: () => (
                <Button onPress={signOut} compact>
                  Sign out
                </Button>
              ),
              title: 'PGApp',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.flex}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <AuthProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
            <StatusBar style="auto" />
          </AuthProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9FAFB' },
});
