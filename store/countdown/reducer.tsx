import { Pomodoro } from '@/interfaces';
import { ActionType } from './types';

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
                    currentInterval: state.currentInterval + 1,
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
        case 'reset': {
            return {
                ...state,
                currentTime: 1500,
                currentInterval: 0,
                status: 'focus',
                isRunning: false,
            };
        }
        case 'take-break':
            return {
                ...state,
                currentTime: 300,
                currentInteval: state.currentInterval + 1,
                status: 'shortbreak',
            };
        case 'start-focus':
            return {
                ...state,
                isRunning: false,
                currentTime: 1500,
                currentInteval: state.currentInterval + 1,
                status: 'focus',
            };
        case 'countdown':
            return { ...state, currentTime: state.currentTime - 1 };
        default:
            state;
    }
};

export default reducer;
