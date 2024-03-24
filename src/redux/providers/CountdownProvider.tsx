'use client';

import { Provider } from 'react-redux';
import { store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import * as ReduxStore from '@/redux/store';

type Props = { children: React.ReactNode };

const GlobalProvider = ({ children }: Props) => {
  const persistor = persistStore(ReduxStore.store);

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>{children}</Provider>
    </PersistGate>
  );
};

export default GlobalProvider;
