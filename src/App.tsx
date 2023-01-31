import React from 'react';

import { AppNavigator } from './navigators/AppNavigator';
import { StoreContext, globalStore } from './store';

function App(): JSX.Element {
  return (
    <StoreContext.Provider value={globalStore}>
      <AppNavigator />
    </StoreContext.Provider>
  );
}

export default App;
