import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EmptyState({ icon = 'inbox', message = 'Nothing here yet' }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name={icon} size={48} color="#D1D5DB" />
      <Text variant="bodyLarge" style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', paddingVertical: 48 },
  text: { marginTop: 12, color: '#9CA3AF', textAlign: 'center' },
});
