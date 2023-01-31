import { createContext, useContext } from 'react';
import { GlobalStore } from './global';

export const StoreContext = createContext<GlobalStore | null>(null);
export const useStore = () => useContext(StoreContext);
