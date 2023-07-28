import { Pomodoro } from '@/interfaces';
import { createContext, useEffect, useReducer } from 'react';

type PomodoroContextType = {
    pomodoro: Pomodoro;
    dispatch: React.Dispatch<ActionType>;
};

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

type PomodoroContextProviderType = {
    children: React.ReactNode | React.ReactNode[];
};

const PomodoroContextProvider = ({ children }: PomodoroContextProviderType) => {
    const [pomodoro, dispatch] = useReducer(reducer, initialPomodoroState);

    const statusIsDone = ($status: 'focus' | 'shortbreak'): boolean => timeIsZero() && pomodoro.status === $status;

    const focusIsDone = (): boolean => statusIsDone('focus');

    const breakIsDone = (): boolean => statusIsDone('shortbreak');

    const timeIsZero = (): boolean => pomodoro.currentTime === 0;

    useEffect(() => {
        if (!pomodoro.isRunning) return;

        const interval = setInterval(() => {
            if (focusIsDone()) {
                new Notification('¡Buen trabajo!', {
                    body: 'Tomaté un descansito 🍅',
                });
                dispatch({ type: 'take-break' });
                return;
            }

            if (breakIsDone()) {
                new Notification('¿Ya estas fresco?', {
                    body: '¡Momento de laburar! 🤓',
                });
                dispatch({ type: 'start-focus' });
                return;
            }

            dispatch({ type: 'countdown' });
        }, 1000);

        return () => clearInterval(interval);
    }, [pomodoro.currentTime, pomodoro.isRunning]);

    return <PomodoroContext.Provider value={{ pomodoro, dispatch }}>{children}</PomodoroContext.Provider>;
};

type ActionType = {
    type: string;
};

const reducer = (state: Pomodoro, action: ActionType) => {
    const { type } = action;
    switch (type) {
        case 'play':
            return { ...state, isRunning: true };
        case 'pause':
            return { ...state, isRunning: false };
        case 'skip': {
            if (state.status === 'focus')
                return {
                    ...state,
                    isRunning: false,
                    currentTime: 300,
                    status: 'shortbreak',
                };
            else if (state.status === 'shortbreak')
                return {
                    ...state,
                    isRunning: false,
                    currentTime: 1500,
                    status: 'focus',
                };
            else return state;
        }
        case 'take-break':
            return {
                ...state,
                currentTime: 300,
                currentInteval: state.currentInteval + 1,
                status: 'shortbreak',
            };
        case 'start-focus':
            return {
                ...state,
                isRunning: false,
                currentTime: 1500,
                currentInteval: state.currentInteval + 1,
                status: 'focus',
            };
        case 'countdown':
            return { ...state, currentTime: state.currentTime - 1 };
        default:
            state;
    }
};

export default PomodoroContextProvider;
