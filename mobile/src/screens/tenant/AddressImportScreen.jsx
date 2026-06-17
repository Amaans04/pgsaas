import { ScrollView, StyleSheet, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Button } from 'react-native-paper';

const APPS = [
  {
    name: 'Zomato',
    description: 'Copy your saved address from Zomato profile',
    url: 'zomato://',
    fallback: 'https://www.zomato.com',
  },
  {
    name: 'Swiggy',
    description: 'Open Swiggy and copy address from account settings',
    url: 'swiggy://',
    fallback: 'https://www.swiggy.com',
  },
  {
    name: 'Zepto',
    description: 'Copy delivery address from Zepto app',
    url: 'zepto://',
    fallback: 'https://www.zeptonow.com',
  },
  {
    name: 'Amazon',
    description: 'Use your Amazon delivery address as reference',
    url: 'amazon://',
    fallback: 'https://www.amazon.in',
  },
];

async function openApp(app) {
  const canOpen = await Linking.canOpenURL(app.url);
  Linking.openURL(canOpen ? app.url : app.fallback);
}

export default function AddressImportScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="bodyMedium" style={styles.intro}>
          Share your PG address with friends and delivery apps. Open an app below, copy your saved address, and paste it wherever you need.
        </Text>
        {APPS.map((app) => (
          <Card key={app.name} style={styles.card} mode="elevated">
            <Card.Content>
              <Text variant="titleMedium">{app.name}</Text>
              <Text variant="bodySmall" style={styles.desc}>{app.description}</Text>
              <Button mode="contained-tonal" onPress={() => openApp(app)} style={styles.btn}>
                Open {app.name}
              </Button>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  content: { padding: 16 },
  intro: { color: '#6B7280', marginBottom: 16 },
  card: { marginBottom: 12, backgroundColor: '#fff' },
  desc: { color: '#6B7280', marginTop: 4, marginBottom: 12 },
  btn: { alignSelf: 'flex-start' },
});
