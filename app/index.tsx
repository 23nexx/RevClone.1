import { View, Text, FlatList } from 'react-native';
import { useLedger } from '../src/store/transactionsStore';
import { useUserRoleStore } from '../src/state/userRoleStore';
import { filterTxs } from '../src/utils/transactionFilters';
import { fmtMoney, fmtDate } from '../src/utils/formatCurrencyDate';

export default function Home(){
  const { ledger } = useLedger();
  const { role } = useUserRoleStore();
  const data = filterTxs(role, ledger.ownerName, ledger.txs).slice(0,5);
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:28, fontWeight:'800' }}>{fmtMoney(ledger.balance)}</Text>
      <Text style={{ marginTop:12, fontWeight:'700' }}>Últimas transações</Text>
      <FlatList data={data} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={{ paddingVertical:8 }}>
          <Text>{item.from} → {item.to}</Text>
          <Text>{fmtMoney(item.amount)} • {fmtDate(item.date)}</Text>
        </View>
      )}/>
    </View>
  );
}
