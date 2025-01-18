import React from 'react';
import { roboto } from '@/fonts';

type CountdownButtonProps = {
    text: 'PAUSE' | 'START';
    action: () => void;
};

export default function CountdownButton({
    text,
    action,
}: CountdownButtonProps): React.ReactElement {
    function handleAction(): void {
        action();
    }

    const isPaused = text === 'PAUSE';

    return (
        <button
            type="button"
            className={`${roboto.className} h-12 w-28 rounded-lg border  bg-zinc-100 text-xl font-bold tracking-wider text-zinc-600 ${isPaused ? 'bg-zinc-200 shadow-inner' : ''} hover:bg-zinc-200`}
            onClick={handleAction}
        >
            {text}
        </button>
    );
}
