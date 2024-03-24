import { Pomodoro } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

const FOCUS_TIME = 1500;
const BREAK_TIME = 300;
const LONG_BREAK_TIME = 900;

const initialState: Pomodoro = {
  isRunning: false,
  status: 'Focus',
  currentInterval: 0,
  currentTime: FOCUS_TIME,
};

export const countdownSlice = createSlice({
  name: 'countdown',
  initialState,
  reducers: {
    play: (state) => {
      return { ...state, isRunning: true };
    },
    pause: (state) => {
      return { ...state, isRunning: false };
    },
    reset: (state) => {
      return {
        ...state,
        currentTime: FOCUS_TIME,
        currentInterval: 0,
        status: 'Focus',
        isRunning: false,
      };
    },
    startShortbreak: (state) => {
      return {
        ...state,
        currentTime: BREAK_TIME,
        currentInterval: state.currentInterval,
        status: 'Short Break',
      };
    },
    startFocus: (state) => {
      return {
        ...state,
        currentTime: FOCUS_TIME,
        currentInterval: state.currentInterval + 1,
        status: 'Focus',
      };
    },
    startLongbreak: (state) => {
      return {
        ...state,
        currentTime: LONG_BREAK_TIME,
        currentInterval: state.currentInterval,
        status: 'Long Break',
      };
    },
    countdown: (state) => {
      return { ...state, currentTime: state.currentTime - 1 };
    },
  },
});

export const {
  play,
  pause,
  reset,
  countdown,
  startFocus,
  startLongbreak,
  startShortbreak,
} = countdownSlice.actions;
export default countdownSlice.reducer;
