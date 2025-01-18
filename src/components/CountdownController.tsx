/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useMemo } from 'react';
import Countdown from './Countdown';
import CountdownButton from './CountdownButton';
import { formatCountdown, getBarColor } from '@/utils/functions';
import useCountdown from '@/hooks/useCountdown';
import { roboto } from '@/fonts';

export default function CountdownController(): React.ReactElement {
    const { currentTime, currentInterval, isRunning, pause, play, status } =
        useCountdown();
    const totalTime = useMemo(() => currentTime, [status]);
    const barColor = useMemo(() => getBarColor(status), [status]);
    const percentageCompleted = useMemo(
        () => currentTime * (200 / totalTime),
        [currentTime]
    );

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
        <section className="flex h-[300px] w-[500px] flex-col items-center rounded-xl border bg-zinc-100 py-5 shadow-lg">
            <div className="mb-10 flex flex-col items-center">
                <p className={`${roboto.className} text-sm`}>
                    {currentInterval} pomodoros
                </p>
                <div className="h-2 w-[200px] overflow-hidden rounded border bg-zinc-50">
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
