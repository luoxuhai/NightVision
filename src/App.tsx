import '@/store/_persist';

import React from 'react';
import { DevSettings } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';

import { AppNavigator } from './navigators/AppNavigator';
import { StoreContext, globalStore } from './store';

if (__DEV__) {
  DevSettings.addMenuItem('Clear Persisted', () => {
    globalStore.clearPersisted();
    DevSettings.reload();
  });
}

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
