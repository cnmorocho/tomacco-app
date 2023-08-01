import { Pomodoro } from '@/interfaces';
import { createContext, useEffect, useReducer } from 'react';
import reducer from './reducer';
import { PomodoroContextProviderType, PomodoroContextType } from './types';
import { createNotification } from '@/utils/functions';

const initialPomodoroState: Pomodoro = {
    isRunning: false,
    status: 'focus',
    currentInteval: 0,
    currentTime: 1500,
};

const defaultValue: PomodoroContextType = {
    pomodoro: initialPomodoroState,
    dispatch: () => null,
};

export const PomodoroContext = createContext<PomodoroContextType>(defaultValue);

const PomodoroContextProvider = ({ children }: PomodoroContextProviderType) => {
    const [pomodoro, dispatch] = useReducer(reducer, initialPomodoroState);

    const isStatusDone = ($status: 'focus' | 'shortbreak'): boolean => isTimeZero() && pomodoro.status === $status;

    const isFocusDone = (): boolean => isStatusDone('focus');

    const isBreakDone = (): boolean => isStatusDone('shortbreak');

    const isTimeZero = (): boolean => pomodoro.currentTime === 0;

    useEffect(() => {
        if (!pomodoro.isRunning) return;

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
    }, [pomodoro.currentTime, pomodoro.isRunning]);

    return <PomodoroContext.Provider value={{ pomodoro, dispatch }}>{children}</PomodoroContext.Provider>;
};

export default PomodoroContextProvider;
