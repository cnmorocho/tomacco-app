'use client';

import React from 'react';
import Countdown from './Countdown';
import CountdownButton from './CountdownButton';
import {
  formatCountdown,
} from '@/utils/functions';
import useCountdown from '@/hooks/useCountdown';

const CountdownController = () => {
  const { currentTime, currentInterval, isRunning, pause, play } = useCountdown();

  const ConditionalButton = (): JSX.Element => {
    return isRunning ? (
      <CountdownButton text='Pause' action={pause} />
    ) : (
      <CountdownButton text='Start' action={play} />
    );
  };

  const [minutes, seconds] = formatCountdown(currentTime);
  document.title = `Tomacco - ${minutes}:${seconds}`

  return (
    <section className='flex w-full flex-col items-center justify-center gap-10'>
      <Countdown
        minutes={minutes}
        seconds={seconds}
        currentInterval={currentInterval}
      />
      <ConditionalButton />
    </section>
  );
};

export default CountdownController;
