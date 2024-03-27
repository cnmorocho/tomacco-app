import { roboto, robotoCondensed } from '@/fonts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setName } from '@/redux/slices/user';
import { ChangeEvent, useState } from 'react';
import ModalButton from './ModalButton';

type Props = {
  isVisible: boolean;
  toggleVisiblity: Function;
};

export default function NameModal({ isVisible, toggleVisiblity }: Props) {
  const userName = useAppSelector((state) => state.user.name);
  const dispatch = useAppDispatch();
  const [newUserName, setNewUserName] = useState('');
  const title = 'Set name';
  const buttonLabel = 'Save';
  const buttonIsDisabled = newUserName.length < 3 || newUserName.length > 15;

  if (!isVisible) return <></>;

  function handleOnChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setNewUserName(event.target.value);
  }

  function handleSetName() {
    dispatch(setName(newUserName));
    toggleVisiblity(false);
  }

  function closeModal() {
    setNewUserName('');
    toggleVisiblity(false);
  }

  return (
    <div
      className='fixed left-0 top-0 z-50 flex h-4/5 w-full items-center justify-center bg-transparent'
      onClick={closeModal}
    >
      <div
        className='flex h-28 min-h-28 w-[500px] flex-col gap-2 rounded-md border border-zinc-500 bg-zinc-50 px-3 py-2 shadow-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <p className={`${roboto.className} text-lg font-medium`}>{title}</p>
        <form className='flex gap-3' onSubmit={handleSetName}>
          <input
            type='text'
            className='text-md h-8 w-full rounded border border-zinc-500 bg-zinc-50 px-2 focus:outline-0'
            placeholder={userName}
            onChange={handleOnChangeInput}
            autoFocus
          />
          <ModalButton label={buttonLabel} isDisabled={buttonIsDisabled} />
        </form>
      </div>
    </div>
  );
}
