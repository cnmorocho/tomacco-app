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

    const { isRunning, currentTime, status } = pomodoro;

    const isStatusDone = ($status: 'focus' | 'shortbreak'): boolean => isTimeZero() && status === $status;

    const isFocusDone = (): boolean => isStatusDone('focus');

    const isBreakDone = (): boolean => isStatusDone('shortbreak');

    const isTimeZero = (): boolean => currentTime === 0;

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            if (isFocusDone()) {
                createNotification('¡Buen trabajo!', 'Tomaté un descansito 🍅');
                dispatch({ type: 'take-break' });
                return;
            }

            if (isBreakDone()) {
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
