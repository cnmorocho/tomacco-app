/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    countdown,
    startFocus,
    startLongbreak,
    startShortbreak,
    pause,
    play,
} from '@/redux/slices/countdown';
import { addTimestamp } from '@/redux/slices/stats';
import type { Status } from '@/types';
import { createNotification, getTimestampFromDate } from '@/utils/functions';
import {
    notificationBreak,
    notificationFocus,
} from '@/utils/functions/texts';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function useCountdown() {
    const { currentTime, currentInterval, isRunning, status } = useAppSelector(
        (state) => state.countdown
    );

    const dispatch = useAppDispatch();
    const pauseCountdown = (): void => {
        dispatch(pause());
    };
    const playCountdown = (): void => {
        dispatch(play());
    };

    const isStatusDone = ($status: Status): boolean =>
        isTimeZero() && status === $status;

    const isTimeForBreak = (): boolean => isStatusDone('Focus');

    const isTimeForFocus = (): boolean =>
        isStatusDone('Short Break') || isStatusDone('Long Break');

    const isTimeToLongBreak = (): boolean =>
        isTimeForBreak() && currentInterval % 4 === 0 && currentInterval !== 0;

    const isTimeZero = (): boolean => currentTime === 0;

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            if (isTimeToLongBreak()) {
                createNotification(
                    notificationBreak.title,
                    notificationBreak.message
                );
                dispatch(addTimestamp(getTimestampFromDate(new Date())));
                dispatch(startLongbreak());
                return;
            }

            if (isTimeForBreak()) {
                createNotification(
                    notificationBreak.title,
                    notificationBreak.message
                );
                dispatch(addTimestamp(getTimestampFromDate(new Date())));
                dispatch(startShortbreak());
                return;
            }

            if (isTimeForFocus()) {
                createNotification(
                    notificationFocus.title,
                    notificationFocus.message
                );
                dispatch(startFocus());
                return;
            }

            dispatch(countdown());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [
        currentTime,
        isRunning,
        isTimeForBreak,
        isTimeForFocus,
        isTimeToLongBreak,
        dispatch,
    ]);

    return {
        currentTime,
        currentInterval,
        isRunning,
        status,
        pause: pauseCountdown,
        play: playCountdown,
    };
}
