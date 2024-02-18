import DesktopWrapper from '@/components/DesktopWrapper';
import Navbar from '@/components/Navbar';
import TimerSection from '@/components/TimerSection';
import { robotoSerif } from '@/fonts';
import { getRandomMotivationalQuote } from '@/services/quotes';
import { formatCountdown } from '@/utils/functions';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';

export default function Home() {
    const [quote, setQuote] = useState('');
    const {isRunning, currentTime} = useAppSelector(state => state.countdown);
    const [minutes, seconds] = formatCountdown(currentTime);
    const title = isRunning ? `${minutes}:${seconds}` : 'Tomacco'

    useEffect(() => {
        getRandomMotivationalQuote().then(setQuote);
    }, [])

    return (
      <DesktopWrapper title={title}>
        <Navbar />
        <div className='h-3/5 flex flex-col justify-center gap-10'>
          <div
            className={`${robotoSerif.className} flex justify-center text-zinc-700 font-normal`}>
            {quote ? (
              <p className='w-auto py-1 px-1 text-center hover:bg-zinc-700 hover:text-zinc-50 hover:cursor-pointer transition duration-200 text-md italic'>
                "{quote}"
              </p>
            ) : (
              <div className='animate-pulse h-5 bg-zinc-500 rounded-full w-36'></div>
            )}
          </div>
          <TimerSection />
        </div>
      </DesktopWrapper>
    );
}
