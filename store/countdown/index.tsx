import { Pomodoro } from '@/interfaces';
import { createContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import { PomodoroContextProviderType, PomodoroContextType } from './types';
import { createNotification } from '@/utils/functions';

const initialPomodoroState: Pomodoro = {
    isRunning: false,
    status: 'focus',
    currentInterval: 1,
    currentTime: 1500,
};

const defaultValue: PomodoroContextType = {
    pomodoro: initialPomodoroState,
    dispatch: () => null,
};

export const PomodoroContext = createContext<PomodoroContextType>(defaultValue);

const PomodoroContextProvider = ({ children }: PomodoroContextProviderType) => {
    const [pomodoro, dispatch] = useReducer(reducer, initialPomodoroState);

    const { isRunning, currentTime, status, currentInterval } = pomodoro;

    const isStatusDone = ($status: 'focus' | 'shortbreak' | 'longbreak'): boolean => isTimeZero() && status === $status;

    const isTimeForBreak = (): boolean => isStatusDone('focus');

    const isTimeForFocus = (): boolean => isStatusDone('shortbreak') || isStatusDone('longbreak');

    const isTimeToLongBreak = (): boolean => isTimeForBreak() && currentInterval % 4 === 0;

    const isTimeZero = (): boolean => currentTime === 0;

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            if (isTimeToLongBreak()) {
                createNotification('¡Increible trabajo!', 'Anda a comer una fruta 🍅');
                dispatch({ type: 'start-longbreak' });
                return;
            }

            if (isTimeForBreak()) {
                createNotification('¡Buen trabajo!', 'Tomaté un descansito 🍅');
                dispatch({ type: 'start-shortbreak' });
                return;
            }

            if (isTimeForFocus()) {
                createNotification('¿Ya estas fresco?', '¡Momento de laburar! 🤓');
                dispatch({ type: 'start-focus' });
                return;
            }

            dispatch({ type: 'countdown' });
        }, 1000);

        return () => clearInterval(interval);
    }, [currentTime, isRunning]);

    return <PomodoroContext.Provider value={{ pomodoro, dispatch }}>{children}</PomodoroContext.Provider>;
};

export default PomodoroContextProvider;
