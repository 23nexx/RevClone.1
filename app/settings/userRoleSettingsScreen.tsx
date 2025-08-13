import { View, Text, Button } from 'react-native';
import { useUserRoleStore } from '../../src/state/userRoleStore';

export default function UserRoleSettingsScreen(){
  const { role, setRole } = useUserRoleStore();
  return (
    <View style={{ padding:16, gap:8 }}>
      <Text>Perfil atual: {role}</Text>
      <Button title="Admin" onPress={()=>setRole('admin')} />
      <Button title="Remetente" onPress={()=>setRole('sender')} />
      <Button title="Destinatário" onPress={()=>setRole('recipient')} />
    </View>
  );
}
