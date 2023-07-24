import React, { useContext, useEffect } from 'react';
import usePomo from '@/hooks/usePomo';
import Countdown from '../Countdown';
import styles from './timer-section.module.css';
import CountdownButton from '../CountdownButton';
import SkipButton from '../SkipButton';
import { formatCountdown } from '@/utils/functions';
import { ThemeContext } from '@/store/theme';

const TimerSection = () => {
    const { countdown, play, pause, skip } = usePomo();
    const { currentTime, currentInteval, isRunning, status } = countdown;
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (Notification.permission === 'granted') return;
        else
            Notification.requestPermission().then(
                (res) =>
                    res === 'granted' &&
                    new Notification('Hola, humano productivo', {
                        body: 'Desde ahora te notificaré por acá',
                    })
            );
    }, []);

    const ConditionalButton = (): JSX.Element => {
        return isRunning ? (
            <CountdownButton
                text='PAUSAR'
                action={pause}
            />
        ) : (
            <CountdownButton
                text='INICIAR'
                action={play}
            />
        );
    };

    const [minutes, seconds] = formatCountdown(currentTime);

    return (
        <section className={`${styles.section} ${theme}`}>
            <Countdown
                minutes={minutes}
                seconds={seconds}
                currentInterval={currentInteval}
            />
            <div className={styles['buttons']}>
                <ConditionalButton />
                <SkipButton action={skip} />
            </div>
        </section>
    );
};

export default TimerSection;
