import CountdownProvider from '@/redux/providers/CountdownProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <CountdownProvider>
            <Component {...pageProps} />
        </CountdownProvider>
    );
}
