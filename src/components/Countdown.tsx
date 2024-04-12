import React from 'react';
import { roboto } from '@/fonts';

type CountdownProps = {
  minutes: string;
  seconds: string;
  currentInterval: number;
};

export default function Countdown({
  minutes,
  seconds,
}: CountdownProps): React.ReactElement {
  return (
    <div
      className={`${roboto.className} flex flex-col items-center gap-6 text-zinc-700`}
    >
      <p className='text-7xl font-bold'>
        {minutes}:{seconds}
      </p>
    </div>
  );
}
