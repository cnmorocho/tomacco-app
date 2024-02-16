import React, { useContext } from 'react';
import { PomodoroContext } from '@/store/countdown';
import { robotoSerif, roboto } from '@/fonts';

type CountdownProps = {
    minutes: string;
    seconds: string;
    currentInterval: number;
};

const Countdown = ({ minutes, seconds, currentInterval }: CountdownProps) => {
    const { dispatch } = useContext(PomodoroContext);

    const resetCountdown = (): void => {
        if (confirm('¿Esta seguro que desea reiniciar el pomodoro?')) dispatch({ type: 'reset' });
    };

    return (
        <div className={`${robotoSerif.className} flex flex-col items-center text-zinc-800`}>
            <p
                onClick={resetCountdown}
                className={`${roboto.className} text-lg cursor-pointer font-normal`} >
                #{currentInterval}
            </p>
            <p className="text-6xl font-bold">
                {minutes}:{seconds}
            </p>
        </div>
    );
};

export default Countdown;
