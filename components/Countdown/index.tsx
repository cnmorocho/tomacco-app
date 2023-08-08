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

    return (
        <div className={styles['container']}>
            <p
                onClick={() => dispatch({ type: 'reset' })}
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
