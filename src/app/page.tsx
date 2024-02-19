"use client"
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { store } from '@/redux/store';
import CountdownProvider from '@/redux/providers/CountdownProvider';
import App from '@/components/App';

export default function Home() {
  const persistor = persistStore(store);

  return (
    <PersistGate persistor={persistor}>
      <CountdownProvider>
        {' '}
        <App />
      </CountdownProvider>
    </PersistGate>
  );
}
