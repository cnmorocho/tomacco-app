import React, { useContext, useEffect } from 'react';
import Countdown from '../Countdown';
import CountdownButton from '../CountdownButton';
import { formatCountdown } from '@/utils/functions';
import { PomodoroContext } from '@/store/countdown';

const TimerSection = () => {
    const { pomodoro, dispatch } = useContext(PomodoroContext);
    const { currentTime, currentInterval, isRunning } = pomodoro;

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
                action={() => dispatch({ type: 'pause' })}
            />
        ) : (
            <CountdownButton
                text='Start'
                action={() => dispatch({ type: 'play' })}
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

export default TimerSection;
