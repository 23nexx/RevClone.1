import { View, Text, FlatList } from 'react-native';
import { useLedger } from '../src/store/transactionsStore';
import { useUserRoleStore } from '../src/state/userRoleStore';
import { filterTxs } from '../src/utils/transactionFilters';
import { fmtMoney, fmtDate } from '../src/utils/formatCurrencyDate';

export default function History(){
  const { ledger } = useLedger();
  const { role } = useUserRoleStore();
  const data = filterTxs(role, ledger.ownerName, ledger.txs);
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:22, fontWeight:'800' }}>Histórico</Text>
      <FlatList data={data} keyExtractor={i=>i.id} renderItem={({item})=>(
        <View style={{ paddingVertical:8, borderBottomWidth:0.5 }}>
          <Text>{item.from} → {item.to}</Text>
          <Text>{fmtMoney(item.amount)} • {fmtDate(item.date)}</Text>
          {!!item.note && <Text>{item.note}</Text>}
        </View>
      )}/>
    </View>
  );
}
