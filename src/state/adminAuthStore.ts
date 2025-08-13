import { MMKV } from 'react-native-mmkv';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const kv = new MMKV({ id: 'admin-auth' });

type S = { unlocked: boolean; unlock: ()=>void; lock: ()=>void };

export const useAdminAuth = create<S>()(
  persist(
    (set)=>({ unlocked:false, unlock:()=>set({unlocked:true}), lock:()=>set({unlocked:false}) }),
    {
      name: 'admin-auth',
      storage: createJSONStorage(() => ({
        getItem: (k) => kv.getString(k) ?? null,
        setItem: (k, v) => kv.set(k, v),
        removeItem: (k) => kv.delete(k),
      })),
    }
  )
);
