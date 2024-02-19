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
    <div className='w-full h-4/5 fixed top-0 left-0 bg-transparent flex items-center justify-center'>
      <div className='w-[500px] min-h-28 bg-zinc-50 border-zinc-500 border py-2 px-3 flex flex-col gap-2'>
        <p className={`${roboto.className} text-lg font-medium`}>
          {title}
        </p>
        <p className={`${roboto.className} text-sm font-normal pb-2`}>
          {description}
        </p>
        <div className='flex flex-row gap-3'>
          <button
            className={`${robotoCondensed.className} bg-zinc-700 text-zinc-50 h-8 w-24 text-sm`}
            onClick={handleConfirm}>
            Confirm
          </button>
          <button
            className={`${robotoCondensed.className} bg-zinc-700 text-zinc-50 h-8 w-24 text-sm`}
            onClick={() => toggleVisiblity(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
