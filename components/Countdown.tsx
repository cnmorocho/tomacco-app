import React from 'react';
import { robotoSerif, roboto } from '@/fonts';
import { useAppDispatch } from '@/redux/hooks';
import { reset } from '@/redux/slices/countdown';

type CountdownProps = {
    minutes: string;
    seconds: string;
    currentInterval: number;
};

const Countdown = ({ minutes, seconds, currentInterval }: CountdownProps) => {
    const dispatch = useAppDispatch();

    const resetCountdown = (): void => {
        if (confirm('¿Esta seguro que desea reiniciar el pomodoro?'))
          dispatch(reset());
    };

    return (
        <div className={`${robotoSerif.className} flex flex-col items-center text-zinc-800`}>
            <p
                onClick={resetCountdown}
                className={`${roboto.className} text-lg cursor-pointer font-normal p-1 hover:bg-zinc-700 hover:text-zinc-50`} >
                #{currentInterval}
            </p>
            <p className="text-6xl font-bold">
                {minutes}:{seconds}
            </p>
        </div>
    );
};

export default Countdown;
