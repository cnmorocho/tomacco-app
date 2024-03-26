import { robotoCondensed } from '@/fonts';

type Props = {
  label: string;
  isDisabled: boolean;
};

export default function ModalButton({ label, isDisabled }: Props) {
  return (
    <button
      className={`${robotoCondensed.className} h-8 w-24 rounded border border-zinc-400 bg-zinc-50 text-sm text-zinc-900 hover:cursor-pointer hover:bg-zinc-200 hover:text-zinc-800 active:bg-zinc-300 disabled:cursor-not-allowed disabled:border-0 disabled:bg-zinc-300 disabled:text-zinc-400`}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
}
