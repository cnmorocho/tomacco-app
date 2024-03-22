import { roboto, robotoCondensed } from "@/fonts";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setName } from "@/redux/slices/user";
import { ChangeEvent, useState } from "react";

type Props = {
   title:string, isVisible: boolean, toggleVisiblity: Function
}

export default function NameModal({ title, isVisible, toggleVisiblity }: Props) {
  const userName = useAppSelector(state => state.user.name)
  const dispatch = useAppDispatch()
  const [newUserName, setNewUserName] = useState(userName); 

  if (!isVisible) return <></>

  function handleOnChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setNewUserName(event.target.value);
  }

  function handleSetName() {
    dispatch(setName(newUserName))
    toggleVisiblity(false);
  }

  return (
    <div
      className='w-full h-4/5 fixed top-0 left-0 bg-transparent flex items-center justify-center z-50'
      onClick={() => toggleVisiblity(false)}>
      <div
        className='w-[500px] min-h-28 bg-zinc-50 border-zinc-500 border py-2 px-3 flex flex-col gap-2'
        onClick={(e) => e.stopPropagation()}>
        <p className={`${roboto.className} text-lg font-medium`}>{title}</p>
        <div className="flex gap-3">
          <input
            type='text'
            className='bg-zinc-50 border-zinc-500 border h-8 text-md focus:outline-0 w-full px-2'
            placeholder={userName}
            onChange={handleOnChangeInput}
            autoFocus
          />
          <button
            className={`${robotoCondensed.className} bg-zinc-700 text-zinc-50 h-8 w-24 text-sm`}
            onClick={handleSetName}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
