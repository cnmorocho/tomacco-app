import { Pomodoro } from '@/interfaces';

export type PomodoroContextType = {
    pomodoro: Pomodoro;
    dispatch: React.Dispatch<ActionType>;
};

export type PomodoroContextProviderType = {
    children: React.ReactNode | React.ReactNode[];
};

export type ActionType = {
    type: string;
};
