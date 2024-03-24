import React from 'react';
import { robotoCondensed } from '@/fonts';
import useSound from 'use-sound';

type CountdownButtonProps = {
  text: string;
  action: () => void;
};

const CountdownButton = ({ text, action }: CountdownButtonProps) => {
  const [playClickSound] = useSound('/sounds/click.mp3', { volume: 0.4 });
  async function handleAction() {
    playClickSound();
    action();
  }

  return (
    <button
      type='button'
      className={`${robotoCondensed.className} h-12 w-28 bg-zinc-800 text-xl font-medium text-zinc-50`}
      onClick={handleAction}
    >
      {text}
    </button>
  );
};

export default CountdownButton;
