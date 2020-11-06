// react-native-get-random-valuesはindexのTopであること。
import 'react-native-get-random-values'
import React, { useEffect, useState } from 'react';
import RouterComponent from './src/Route';
import StoreProvider from './src/store';

const App: React.FC = () => {

  return (
    <StoreProvider>
      <RouterComponent />
    </StoreProvider>
  );

}

export default App

