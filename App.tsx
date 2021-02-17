// react-native-get-random-valuesはindexのTopであること。
import 'react-native-get-random-values'
import React, { useEffect, useState } from 'react';
import RouterComponent from './src/Route';
import StoreProvider from './src/store';
import { SnackbarProvider } from './src/utils/snackbar';
import { DialogProvider } from './src/utils/dialog';
import { SpinnerProvider } from './src/utils/spinner';
import { NetinfoProvider } from './src/utils/netinfo';

const App: React.FC = () => {

  return (
    <StoreProvider>
      <DialogProvider>
        <SnackbarProvider>
          <SpinnerProvider>
            <NetinfoProvider>
              <RouterComponent />
            </NetinfoProvider>
          </SpinnerProvider>
        </SnackbarProvider>
      </DialogProvider>
    </StoreProvider>
  );

}

export default App

