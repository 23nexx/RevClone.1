import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Role } from '../types';

const kv = new MMKV({ id: 'role-store' });

type S = { role: Role; setRole: (r:Role)=>void };

export const useUserRoleStore = create<S>()(
  persist(
    (set)=>({ role:'admin', setRole:(r)=>set({ role:r }) }),
    {
      name: 'role',
      storage: createJSONStorage(() => ({
        getItem: (k) => kv.getString(k) ?? null,
        setItem: (k, v) => kv.set(k, v),
        removeItem: (k) => kv.delete(k),
      })),
    }
  )
);
