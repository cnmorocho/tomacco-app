import type { Metadata } from 'next';
import CountdownProvider from '@/redux/providers/CountdownProvider';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Tomacco',
  description: 'Tomacco App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <CountdownProvider>
          <div className='m-0 flex h-screen w-full flex-col items-center bg-zinc-50 p-0'>
            <Navbar />
            <div className='flex max-w-[700px] grow lg:w-[700px]'>
              {children}
            </div>
          </div>
        </CountdownProvider>
      </body>
    </html>
  );
}
