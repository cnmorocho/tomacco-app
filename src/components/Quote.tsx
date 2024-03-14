"use client";

import { robotoSerif } from '@/fonts';
import { getRandomMotivationalQuote } from '@/services/quotes';
import { useEffect, useState } from 'react';

export default function Quote() {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    getRandomMotivationalQuote().then(setQuote);
  }, []);

  return (
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
  );
}
