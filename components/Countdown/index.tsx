import { roboto } from '@/fonts';
import React from 'react';
import styles from './countdown.module.css';

type CountdownProps = {
    minutes: string;
    seconds: string;
    currentInterval: number;
};

const Countdown = ({ minutes, seconds, currentInterval }: CountdownProps) => {
    return (
        <div className={styles['container']}>
            <p className={`${roboto.className} ${styles['interval']}`}>#{currentInterval}</p>
            <p className={`${roboto.className} ${styles['countdown']}`}>
                {minutes}:{seconds}
            </p>
        </div>
    );
};

export default Countdown;
