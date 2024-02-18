import { Pomodoro } from '@/interfaces';
import { createSlice } from '@reduxjs/toolkit';

const initialState: Pomodoro = {
  isRunning: false,
  status: 'Focus',
  currentInterval: 0,
  currentTime: 1500,
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
        currentTime: 1500,
        currentInterval: 0,
        status: 'Focus',
        isRunning: false,
      };
    },
    startShortbreak: (state) => {
      return {
        ...state,
        currentTime: 300,
        currentInterval: state.currentInterval,
        status: 'Short Break',
      };
    },
    startFocus: (state) => {
      return {
        ...state,
        currentTime: 1500,
        currentInterval: state.currentInterval + 1,
        status: 'Focus',
      };
    },
    startLongbreak: (state) => {
      return {
        ...state,
        currentTime: 900,
        currentInterval: state.currentInterval,
        status: 'Long Break',
      };
    },
    countdown: (state) => {
      return { ...state, currentTime: state.currentTime - 1 };
    },
  },
});

export const { play, pause, reset, countdown, startFocus, startLongbreak, startShortbreak } = countdownSlice.actions;
export default countdownSlice.reducer;
