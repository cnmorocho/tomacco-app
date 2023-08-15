import { roboto } from '@/fonts';
import React, { useContext } from 'react';
import styles from './countdown.module.css';
import { PomodoroContext } from '@/store/countdown';

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
        <div className={styles['container']}>
            <p
                onClick={resetCountdown}
                className={`${roboto.className} ${styles.interval}`}>
                #{currentInterval}
            </p>
            <p className={`${roboto.className} ${styles.countdown}`}>
                {minutes}:{seconds}
            </p>
        </div>
    );
};

export default Countdown;
