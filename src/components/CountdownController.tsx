/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useMemo, useRef } from 'react';
import Countdown from './Countdown';
import CountdownButton from './CountdownButton';
import {
    createNotification,
    formatCountdown,
    getBarColor,
} from '@/utils/functions';
import useCountdown from '@/hooks/useCountdown';
import { roboto } from '@/fonts';
import { notificationAskForPermission } from '@/utils/functions/texts';

export default function CountdownController(): React.ReactElement {
    const notificationTriggeredRef = useRef(false);
    const { currentTime, currentInterval, isRunning, pause, play, status } =
        useCountdown();
    const totalTime = useMemo(() => currentTime, [status]);
    const barColor = useMemo(() => getBarColor(status), [status]);
    const percentageCompleted = useMemo(
        () => currentTime * (200 / totalTime),
        [currentTime]
    );

    useEffect(() => {
        if (
            Notification.permission === 'default' &&
            !notificationTriggeredRef.current
        ) {
            Notification.requestPermission()
                .then((res) => {
                    if (res === 'granted') {
                        createNotification(
                            notificationAskForPermission.title,
                            notificationAskForPermission.message
                        );
                        notificationTriggeredRef.current = true;
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, []);

    function ConditionalButton(): React.ReactElement {
        return isRunning ? (
            <CountdownButton text="PAUSE" action={pause} />
        ) : (
            <CountdownButton text="START" action={play} />
        );
    }

    const [minutes, seconds] = formatCountdown(currentTime);
    document.title = `Tomacco - ${minutes}:${seconds}`;

    return (
        <section className="flex h-[300px] w-[500px] flex-col items-center rounded-xl border border-zinc-300 bg-slate-100 py-5 shadow-sm">
            <div className="mb-10 flex flex-col items-center">
                <p className={`${roboto.className} text-sm`}>
                    {currentInterval} pomodoros
                </p>
                <div className="h-2 w-[200px] overflow-hidden rounded border bg-zinc-50 border-zinc-300">
                    <div
                        className={`relative h-3 w-[200px] `}
                        style={{
                            right: `${percentageCompleted}px`,
                            backgroundColor: `${barColor}`,
                        }}
                    ></div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-7">
                <Countdown
                    minutes={minutes}
                    seconds={seconds}
                    currentInterval={currentInterval}
                />
                <ConditionalButton />
            </div>
        </section>
    );
}
