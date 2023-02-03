import '@/store/_persist';

import React from 'react';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import { AppNavigator } from './navigators/AppNavigator';
import { StoreContext, globalStore } from './store';

function App(): JSX.Element {
  return (
    <StoreContext.Provider value={globalStore}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <AppNavigator />
      </SafeAreaProvider>
    </StoreContext.Provider>
  );
}

export default App;
