import { roboto } from '@/fonts';
import React from 'react';

type Props = {
    isVisible: boolean;
    toggleVisiblity: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SettingsModal({
    isVisible,
    toggleVisiblity,
}: Props): React.ReactElement {
    if (!isVisible) return <></>;

    function closeModal(): void {
        toggleVisiblity(false);
    }
    
    return (
        <div
            className="absolute left-0 top-0 z-50 flex h-screen w-full justify-center overflow-auto bg-transparent backdrop-blur-sm"
            onClick={closeModal}
        >
            <div
                className={`${roboto.className} relative top-12 flex h-[700px] w-[500px] flex-col gap-2 rounded-md border border-zinc-300 bg-zinc-100 p-4 shadow-xl`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="mb-1 flex items-end justify-between border-b border-zinc-300 p-2 text-zinc-800">
                    <p className="text-3xl font-extrabold">Settings</p>
                </div>
                <div className="flex-1 px-2 overflow-y-auto">
                    <p className="text-lg font-medium">Timer</p>
                    <div className="pb-2">
                        <p className="text-md">Focus</p>
                        <p className="text-xs">Minutes of the timer when on focus</p>
                        <input type="number" min={1} className="w-full p-1 border border-zinc-300 rounded" />
                    </div>
                    <div className="pb-2">
                        <p className="text-md">Short break</p>
                        <p className="text-xs">Minutes of the timer when on short break</p>
                        <input type="number" min={1} className="w-full p-1 border border-zinc-300 rounded" />
                    </div>
                    <div className="pb-2">
                        <p className="text-md">Long break</p>
                        <p className="text-xs">Minutes of the timer when on long break</p>
                        <input type="number" min={1} className="w-full p-1 border border-zinc-300 rounded" />
                    </div>
                    <div className="pb-2">
                        <p className="text-sm">Long break interval</p>
                        <p className="text-xs">Pomodoros until long break</p>
                        <input type="number" min={1} className="w-full p-1 border border-zinc-300 rounded" />
                    </div>
                </div>
                <div className='sticky bottom-0 left-0 w-full flex justify-end pt-2 bg-zinc-100 border-t border-zinc-300 rounded-b-md'>
                    <button className="bg-zinc-600 text-zinc-50 px-4 py-1 rounded-md hover:bg-zinc-700 active:bg-zinc-800">Save</button>
                </div>
            </div>
        </div>
    );
}
