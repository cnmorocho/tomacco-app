import React from 'react';
import { roboto } from '@/fonts';

type CountdownButtonProps = {
  text: string;
  action: () => void;
};

const CountdownButton = ({ text, action }: CountdownButtonProps) => {
  async function handleAction() {
    action();
  }

  return (
    <button
      type='button'
      className={`${roboto.className} h-12 w-28 rounded-lg bg-zinc-800 text-xl font-medium text-zinc-50 hover:bg-zinc-700`}
      onClick={handleAction}
    >
      {text}
    </button>
  );
};

export default CountdownButton;
