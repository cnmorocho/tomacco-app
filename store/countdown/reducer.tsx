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

export default reducer;
