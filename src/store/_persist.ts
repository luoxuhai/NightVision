import { configurePersistable } from 'mobx-persist-store';

import { set, get, remove } from '@/storage';

configurePersistable({
  debugMode: __DEV__,
  storage: {
    setItem: (key, data) => set(key, data),
    getItem: (key) => get(key) as string | null,
    removeItem: (key) => remove(key),
  },
});
