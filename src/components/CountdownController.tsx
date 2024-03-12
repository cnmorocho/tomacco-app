import React, { useEffect } from 'react';
import Countdown from './Countdown';
import CountdownButton from './CountdownButton';
import { createNotification, formatCountdown } from '@/utils/functions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { countdown, pause, play, startFocus, startLongbreak, startShortbreak } from '@/redux/slices/countdown';
import { Status } from '@/types';


const CountdownController = () => {
    const { currentTime, currentInterval, isRunning, status } = useAppSelector(state => state.countdown);
    const dispatch = useAppDispatch();

    const isStatusDone = ($status: Status): boolean => isTimeZero() && status === $status;

    const isTimeForBreak = (): boolean => isStatusDone('Focus');

    const isTimeForFocus = (): boolean => isStatusDone('Short Break') || isStatusDone('Long Break');

    const isTimeToLongBreak = (): boolean => isTimeForBreak() && currentInterval % 4 === 0 && currentInterval !== 0;

    const isTimeZero = (): boolean => currentTime === 0;

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            if (isTimeToLongBreak()) {
                createNotification('¡Increible trabajo!', 'Anda a comer una fruta 🍅');
                dispatch(startLongbreak());
                return;
            }

            if (isTimeForBreak()) {
                createNotification('¡Buen trabajo!', 'Tomaté un descansito 🍅');
                dispatch(startShortbreak());
                return;
            }

            if (isTimeForFocus()) {
                createNotification('¿Ya estas fresco?', '¡Momento de laburar! 🤓');
                dispatch(startFocus());
                return;
            }

            dispatch(countdown());
        }, 1000);

        return () => clearInterval(interval);
    }, [currentTime, isRunning]);

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
                text='Pause'
                action={() => dispatch(pause())}
            />
        ) : (
            <CountdownButton
                text='Start'
                action={() => dispatch(play())}
            />
        );
    };

    const [minutes, seconds] = formatCountdown(currentTime);

    return (
        <section className="w-full flex flex-col items-center justify-center gap-10">
            <Countdown
                minutes={minutes}
                seconds={seconds}
                currentInterval={currentInterval}
            />
            <ConditionalButton />
        </section>
    );
};

export default CountdownController;
