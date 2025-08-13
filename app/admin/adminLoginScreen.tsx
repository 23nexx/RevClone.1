import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { ADMIN_PIN } from '../../src/constants/adminDefaults';
import { useAdminAuth } from '../../src/state/adminAuthStore';

export default function AdminLoginScreen() {
  const [pin, setPin] = useState('');
  const { unlock } = useAdminAuth();
  const router = useRouter();

  const handleLogin = () => {
    if (pin === ADMIN_PIN) {
      unlock();
      router.replace('/admin');
    } else {
      Alert.alert('PIN incorreto');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login de Administrador</Text>
      <TextInput
        value={pin}
        onChangeText={setPin}
        secureTextEntry
        keyboardType="number-pad"
        placeholder="Introduza o PIN"
        style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}
