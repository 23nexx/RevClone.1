import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Ledger, Tx } from '../types';

const kv = new MMKV({ id: 'wallet-local' });

type State = {
  ledger: Ledger;
  setBalance: (v: number) => void;
  setOwner: (name: string) => void;
  addTx: (tx: Omit<Tx,'id'>) => void;
  updateTx: (id: string, patch: Partial<Tx>) => void;
  removeTx: (id: string) => void;
  seed: () => void;
};

const initial: Ledger = { balance: 0, ownerName: 'You', txs: [] };

export const useLedger = create<State>()(
  persist(
    (set, get) => ({
      ledger: initial,
      setBalance: (v) => set(s => ({ ledger: { ...s.ledger, balance: v }})),
      setOwner: (ownerName) => set(s => ({ ledger: { ...s.ledger, ownerName }})),
      addTx: (tx) => set(s => ({
        ledger: { ...s.ledger, txs: [{ id: rid(), ...tx }, ...s.ledger.txs] }
      })),
      updateTx: (id, patch) => set(s => ({
        ledger: { ...s.ledger, txs: s.ledger.txs.map(t => t.id === id ? { ...t, ...patch } : t) }
      })),
      removeTx: (id) => set(s => ({
        ledger: { ...s.ledger, txs: s.ledger.txs.filter(t => t.id !== id) }
      })),
      seed: () => {
        const now = Date.now();
        const mk = (i:number, from:string, to:string, amount:number, note?:string): Tx => ({
          id: rid(),
          from, to, amount, note,
          date: new Date(now - i*86400000).toISOString()
        });
        const samples: Tx[] = [
          mk(0,'Alice','You', 150,'Almoço'),
          mk(1,'You','Bob', -25.5,'Café'),
          mk(2,'Carol','You', 300,'Transfer'),
          mk(3,'You','Loja', -72.9,'Compras'),
        ];
        set(s => ({ ledger: { ...s.ledger, txs: [...samples, ...s.ledger.txs] }}));
      }
    }),
    {
      name: 'ledger',
      storage: createJSONStorage(() => ({
        getItem: (k) => kv.getString(k) ?? null,
        setItem: (k, v) => kv.set(k, v),
        removeItem: (k) => kv.delete(k),
      })),
    }
  )
);

function rid(){ return Math.random().toString(36).slice(2) + Date.now().toString(36); }
