import { Pomodoro } from '@/interfaces';
import { ActionType } from './types';

const reducer = (state: Pomodoro, action: ActionType): Pomodoro => {
    const { type } = action;
    switch (type) {
        case 'play':
            return { ...state, isRunning: true };
        case 'pause':
            return { ...state, isRunning: false };
        case 'skip': {
            if (state.status === 'focus' && state.currentInterval % 4 === 0)
                return {
                    ...state,
                    isRunning: false,
                    currentTime: 900,
                    status: 'longbreak',
                };
            if (state.status === 'focus')
                return {
                    ...state,
                    isRunning: false,
                    currentTime: 300,
                    status: 'shortbreak',
                };
            else if (state.status === 'shortbreak' || state.status === 'longbreak')
                return {
                    ...state,
                    isRunning: false,
                    currentTime: 1500,
                    currentInterval: state.currentInterval + 1,
                    status: 'focus',
                };
            else return state;
        }
        case 'reset': {
            return {
                ...state,
                currentTime: 1500,
                currentInterval: 1,
                status: 'focus',
                isRunning: false,
            };
        }
        case 'start-shortbreak':
            return {
                ...state,
                currentTime: 300,
                currentInterval: state.currentInterval,
                status: 'shortbreak',
            };
        case 'start-focus':
            return {
                ...state,
                currentTime: 1500,
                currentInterval: state.currentInterval + 1,
                status: 'focus',
            };
        case 'start-longbreak':
            return {
                ...state,
                currentTime: 900,
                currentInterval: state.currentInterval,
                status: 'longbreak',
            };
        case 'countdown':
            return { ...state, currentTime: state.currentTime - 1 };
        default:
            return state;
    }
};

export default reducer;
