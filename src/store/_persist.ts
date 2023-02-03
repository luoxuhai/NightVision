import { configurePersistable } from 'mobx-persist-store';
import { MMKV } from 'react-native-mmkv';

export const mmkv = new MMKV({
  id: 'settings',
});

configurePersistable({
  debugMode: __DEV__,
  storage: {
    setItem: (key, data) => mmkv.set(key, data),
    getItem: (key) => mmkv.getString(key) as string | null,
    removeItem: (key) => mmkv.delete(key),
  },
});
