import { createContext, useContext } from 'react';
import { GlobalStore, globalStore } from './global';

export const StoreContext = createContext<GlobalStore>(globalStore);
export const useStore = () => useContext(StoreContext);
