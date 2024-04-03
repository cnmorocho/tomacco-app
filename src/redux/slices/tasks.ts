import { createSlice } from '@reduxjs/toolkit';

type ActionType = {
  type: string;
  payload: Task;
};

type Task = { title: string; pomodoros: number }

type StateType = Array<Task>;

const initialState: StateType = [];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    createTask: (state: StateType, action: ActionType) => {
      return [...state, action.payload];
    },
  },
});

export const { createTask } = tasksSlice.actions;
export default tasksSlice.reducer;
