import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Text, Button, ActivityIndicator, Snackbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import api from '../../lib/api';

export default function DocumentsScreen() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [snack, setSnack] = useState('');

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/api/documents');
      if (data.success) setDocuments(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const uploadFile = async (uri, fileName, mimeType) => {
    try {
      setUploading(true);
      const authRes = await api.get('/api/imagekit/auth');
      if (!authRes.data.success) throw new Error(authRes.data.error);

      const { token, expire, signature, publicKey } = authRes.data.data;
      const formData = new FormData();
      formData.append('file', { uri, name: fileName, type: mimeType });
      formData.append('publicKey', publicKey || process.env.EXPO_PUBLIC_IMAGEKIT_PUBLIC_KEY);
      formData.append('signature', signature);
      formData.append('expire', String(expire));
      formData.append('token', token);
      formData.append('fileName', fileName);

      const endpoint = process.env.EXPO_PUBLIC_IMAGEKIT_URL_ENDPOINT?.replace(/\/$/, '');
      const uploadRes = await fetch('https://upload.imagekit.io/api/v1/files/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.message || 'Upload failed');

      await api.post('/api/documents', {
        type: 'other',
        fileUrl: uploadData.url,
        fileName,
        fileId: uploadData.fileId,
      });

      setSnack('Document uploaded');
      load();
    } catch (err) {
      setSnack(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      await uploadFile(asset.uri, asset.fileName || 'photo.jpg', asset.mimeType || 'image/jpeg');
    }
  };

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      await uploadFile(asset.uri, asset.name, asset.mimeType || 'application/octet-stream');
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
      <View style={styles.actions}>
        <Button mode="contained" onPress={pickImage} loading={uploading} icon="image">Photo</Button>
        <Button mode="outlined" onPress={pickDocument} disabled={uploading} icon="file">Document</Button>
      </View>
      <FlatList
        data={documents}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card} mode="elevated" onPress={() => Linking.openURL(item.fileUrl)}>
            <Card.Content>
              <Text variant="titleSmall">{item.fileName || item.name}</Text>
              <Text variant="bodySmall" style={styles.link}>Tap to open</Text>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No documents uploaded</Text>}
      />
      <Snackbar visible={!!snack} onDismiss={() => setSnack('')} duration={3000}>{snack}</Snackbar>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  actions: { flexDirection: 'row', gap: 12, padding: 16 },
  list: { padding: 16, paddingTop: 0 },
  card: { marginBottom: 12, backgroundColor: '#fff' },
  link: { color: '#4F46E5', marginTop: 4 },
  empty: { textAlign: 'center', color: '#9CA3AF', marginTop: 24 },
});
