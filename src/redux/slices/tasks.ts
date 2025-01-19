import { createSlice } from '@reduxjs/toolkit';

type ActionType = {
    type: string;
    payload: Task | Task[] | number;
};

export type Task = {
    id: number;
    title: string;
    pomodoros: number;
    pomodorosCompleted: number;
    isDone: boolean;
};

type StateType = Task[];

const initialState: StateType = [];

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        createTask: (state: StateType, action: ActionType) => {
            return [...state, action.payload as Task];
        },
        incresePomodorosCompleted: (state: StateType, action: ActionType) => {
            const tasks: Task[] = state.map((task) => {
                if (task.id === (action.payload as number)) {
                    return {
                        ...task,
                        pomodorosCompleted: task.pomodorosCompleted + 1,
                    };
                } else return task;
            });
            return tasks;
        },
        refreshOrder: (state: StateType, action: ActionType) => {
            return action.payload as Task[];
        },
        switchIsDoneStatus: (state: StateType, action: ActionType) => {
            const tasks: Task[] = state.map((task) => {
                if (task.id === (action.payload as number)) {
                    return { ...task, isDone: !task.isDone };
                } else return task;
            });
            return tasks;
        },
        removeTask: (state: StateType, action: ActionType) => {
            return state.filter(
                (task) => task.id !== (action.payload as number)
            );
        },
    },
});

export const {
    createTask,
    switchIsDoneStatus,
    removeTask,
    refreshOrder,
    incresePomodorosCompleted,
} = tasksSlice.actions;
export default tasksSlice.reducer;
