export type Role = 'admin' | 'sender' | 'recipient';

export type Tx = {
  id: string;
  from: string;
  to: string;
  amount: number;
  date: string; // ISO
  note?: string;
};

export type Ledger = {
  balance: number;
  ownerName: string;
  txs: Tx[];
};
