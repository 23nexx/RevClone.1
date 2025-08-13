import type { Role, Tx } from '../types';
export function filterTxs(role: Role, owner: string, txs: Tx[]){
  if (role === 'admin') return txs;
  if (role === 'sender') return txs.filter(t => t.from === owner);
  return txs.filter(t => t.to === owner);
}
