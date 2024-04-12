import React from 'react';
import { robotoCondensed } from '@/fonts';

type Props = {
  label: string;
  isDisabled: boolean;
};

export default function ModalButton({
  label,
  isDisabled,
}: Props): React.ReactElement {
  return (
    <button
      className={`${robotoCondensed.className} h-8 w-24 rounded border  bg-zinc-50 text-sm text-zinc-900 hover:cursor-pointer hover:bg-zinc-200 hover:text-zinc-800 active:bg-zinc-300 disabled:cursor-not-allowed disabled:border-0 disabled:bg-zinc-300 disabled:text-zinc-400`}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
}
