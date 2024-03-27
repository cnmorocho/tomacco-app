import { roboto, robotoCondensed } from '@/fonts';
import { useAppDispatch } from '@/redux/hooks';
import { reset } from '@/redux/slices/countdown';

type Props = {
  title: string;
  description: string;
  isVisible: boolean;
  toggleVisiblity: Function;
};

export default function ConfirmationModal({
  title,
  description,
  isVisible,
  toggleVisiblity,
}: Props) {
  const dispatch = useAppDispatch();

  if (!isVisible) return <></>;

  function handleConfirm() {
    dispatch(reset());
    toggleVisiblity(false);
  }

  return (
    <div className='fixed left-0 top-0 flex h-4/5 w-full items-center justify-center bg-transparent'>
      <div className='flex min-h-28 w-[500px] flex-col gap-2 border border-zinc-500 bg-zinc-50 px-3 py-2'>
        <p className={`${roboto.className} text-lg font-medium`}>{title}</p>
        <p className={`${roboto.className} pb-2 text-sm font-normal`}>
          {description}
        </p>
        <div className='flex flex-row gap-3'>
          <button
            className={`${robotoCondensed.className} h-8 w-24 bg-zinc-700 text-sm text-zinc-50`}
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button
            className={`${robotoCondensed.className} h-8 w-24 bg-zinc-700 text-sm text-zinc-50`}
            onClick={() => toggleVisiblity(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
