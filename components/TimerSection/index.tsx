import React, { useContext, useEffect } from 'react';
import Countdown from '../Countdown';
import styles from './timer-section.module.css';
import CountdownButton from '../CountdownButton';
import SkipButton from '../SkipButton';
import { formatCountdown } from '@/utils/functions';
import { PomodoroContext } from '@/store/countdown';

const TimerSection = () => {
    const { pomodoro, dispatch } = useContext(PomodoroContext);
    const { currentTime, currentInterval, isRunning, status } = pomodoro;

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
                action={() => dispatch({ type: 'pause' })}
            />
        ) : (
            <CountdownButton
                text='INICIAR'
                action={() => dispatch({ type: 'play' })}
            />
        );
    };

    const [minutes, seconds] = formatCountdown(currentTime);

    return (
        <section className={`${styles.section} ${status}`}>
            <Countdown
                minutes={minutes}
                seconds={seconds}
                currentInterval={currentInterval}
            />
            <div className={styles['buttons']}>
                <ConditionalButton />
                <SkipButton action={() => dispatch({ type: 'skip' })} />
            </div>
        </section>
    );
};

export default TimerSection;
