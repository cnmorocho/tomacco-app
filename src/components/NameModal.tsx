import { roboto, robotoCondensed } from '@/fonts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setName } from '@/redux/slices/user';
import { ChangeEvent, useState } from 'react';

type Props = {
  title: string;
  isVisible: boolean;
  toggleVisiblity: Function;
};

export default function NameModal({
  title,
  isVisible,
  toggleVisiblity,
}: Props) {
  const userName = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();
  const [newUserName, setNewUserName] = useState(userName);

  if (!isVisible) return <></>;

  function handleOnChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setNewUserName(event.target.value);
  }

  function handleSetName() {
    dispatch(setName(newUserName));
    toggleVisiblity(false);
  }

  return (
    <div
      className='fixed left-0 top-0 z-50 flex h-4/5 w-full items-center justify-center bg-transparent'
      onClick={() => toggleVisiblity(false)}
    >
      <div
        className='flex min-h-28 w-[500px] flex-col gap-2 border border-zinc-500 bg-zinc-50 px-3 py-2'
        onClick={(e) => e.stopPropagation()}
      >
        <p className={`${roboto.className} text-lg font-medium`}>{title}</p>
        <div className='flex gap-3'>
          <input
            type='text'
            className='text-md h-8 w-full border border-zinc-500 bg-zinc-50 px-2 focus:outline-0'
            placeholder={userName}
            onChange={handleOnChangeInput}
            autoFocus
          />
          <button
            className={`${robotoCondensed.className} h-8 w-24 bg-zinc-700 text-sm text-zinc-50`}
            onClick={handleSetName}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
