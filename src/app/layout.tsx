import type { Metadata } from "next";
import CountdownProvider from '@/redux/providers/CountdownProvider';
import "./globals.css";
import Navbar from "@/components/Navbar";

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
            <div className='m-0 w-full h-screen p-0 bg-zinc-50 flex flex-col items-center'>
              <Navbar />
              <div className="lg:w-[700px] max-w-[700px] flex grow">
                {children}
              </div>
            </div>
          </CountdownProvider>
      </body>
    </html>
  );
}
