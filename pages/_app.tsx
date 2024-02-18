import CountdownProvider from '@/redux/providers/CountdownProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '../redux/store';


export default function App({ Component, pageProps }: AppProps) {
const persistor = persistStore(store);

  return (
    <PersistGate persistor={persistor}>
      <CountdownProvider>
        <Component {...pageProps} />
      </CountdownProvider>
    </PersistGate>
  );
}
