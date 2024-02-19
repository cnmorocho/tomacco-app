import React from 'react';
import { robotoCondensed } from '@/fonts';
import useSound from 'use-sound';

type CountdownButtonProps = {
    text: string;
    action: () => void;
};

const CountdownButton = ({ text, action }: CountdownButtonProps) => {
    const [playClickSound] = useSound("/sounds/click.mp3", { volume: 0.4 });
    async function handleAction() {
        playClickSound();
        action();
    }

    return (
        <button
            type='button'
            className={`${robotoCondensed.className} text-zinc-50 bg-zinc-800 w-28 h-12 font-medium text-xl`}
            onClick={handleAction}>
            {text}
        </button>
    );
};

export default CountdownButton;
