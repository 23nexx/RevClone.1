import { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useLedger } from '../../src/store/transactionsStore';
import { useAdminAuth } from '../../src/state/adminAuthStore';
import type { Tx } from '../../src/types';
import { fmtMoney, fmtDate } from '../../src/utils/formatCurrencyDate';

export default function AdminDashboardScreen(){
  const { ledger, setBalance, setOwner, addTx, updateTx, removeTx, seed } = useLedger();
  const [draft, setDraft] = useState<Omit<Tx,'id'>>({ from:'', to:'', amount:0, date:new Date().toISOString(), note:'' });
  const [editingId, setEditingId] = useState<string|null>(null);
  const isEditing = useMemo(()=> !!editingId, [editingId]);

  const { unlocked, lock } = useAdminAuth();
  const router = useRouter();

  useEffect(()=>{
    if (!unlocked) router.replace('/admin/login');
  },[unlocked]);

  const onSave = () => {
    if (!draft.from || !draft.to) return Alert.alert('Remetente e destinatário são obrigatórios');
    if (!draft.date) return Alert.alert('Data é obrigatória (ISO ou YYYY-MM-DD)');
    if (isEditing && editingId) {
      updateTx(editingId, draft);
      setEditingId(null);
    } else {
      addTx(draft);
    }
    setDraft({ ...draft, note:'' });
  };

  const startEdit = (tx: Tx) => {
    setEditingId(tx.id);
    setDraft({ from: tx.from, to: tx.to, amount: tx.amount, date: tx.date, note: tx.note ?? '' });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex:1 }}>
      <View style={{ flex:1, padding:16, gap:12 }}>
        <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center' }}>
          <Text style={{ fontSize:22, fontWeight:'800' }}>Admin</Text>
          <Button title="Sair Admin" onPress={()=>{ lock(); router.replace('/admin/login'); }} />
        </View>

        <Text>Owner (base p/ filtros de perfis)</Text>
        <TextInput value={ledger.ownerName} onChangeText={setOwner} autoCapitalize="words"
          style={{ borderWidth:1, padding:8, borderRadius:8 }} />

        <Text>Saldo</Text>
        <TextInput keyboardType="decimal-pad" value={String(ledger.balance)}
          onChangeText={(v)=>setBalance(Number(v||0))}
          style={{ borderWidth:1, padding:8, borderRadius:8 }} />

        <Text style={{ marginTop:8, fontWeight:'700' }}>{isEditing? 'Editar transação' : 'Nova transação'}</Text>
        {(['from','to','amount','date','note'] as const).map((k)=>(
          <TextInput key={k} placeholder={k}
            value={k==='amount'? String(draft.amount): (draft as any)[k] ?? ''}
            onChangeText={(v)=> setDraft(d => ({...d, [k]: k==='amount'? Number(v||0): v}))}
            style={{ borderWidth:1, padding:8, borderRadius:8, marginBottom:6 }} />
        ))}
        <Button title={isEditing? 'Guardar alterações' : 'Guardar'} onPress={onSave} />
        {isEditing && <Button title="Cancelar edição" onPress={()=>{ setEditingId(null); setDraft({ ...draft }); }} />}
        <Button title="Preencher exemplo" onPress={seed} />

        <Text style={{ marginTop:12, fontWeight:'700' }}>Transações</Text>
        <FlatList
          data={ledger.txs}
          keyExtractor={(i)=>i.id}
          renderItem={({item})=>(
            <TouchableOpacity
              onLongPress={()=> Alert.alert('Remover', 'Apagar esta transação?', [
                { text:'Cancelar', style:'cancel' },
                { text:'Remover', style:'destructive', onPress:()=>removeTx(item.id) }
              ])}
              onPress={()=> startEdit(item)}
              style={{ padding:10, borderWidth:1, borderRadius:8, marginBottom:8 }}
            >
              <Text>{item.from} → {item.to}</Text>
              <Text>{fmtMoney(item.amount)} • {fmtDate(item.date)}</Text>
              {!!item.note && <Text>{item.note}</Text>}
            </TouchableOpacity>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
