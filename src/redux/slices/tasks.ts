import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Task {
    id: number;
    title: string;
    pomodorosRemaining: number;
    pomodorosCompleted: number;
    isCompleted: boolean;
}

export interface TaskList {
    todo: Task[];
    completed: Task[];
}

type StateType = TaskList;

const initialState: StateType = {
    todo: [],
    completed: [],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        createTask: (state: StateType, action: PayloadAction<Task>) => {
            return { ...state, todo: [...state.todo, action.payload] };
        },
        removeTask: (state: StateType, action: PayloadAction<number>) => {
            return {
                todo: state.todo.filter((task) => task.id !== action.payload),
                completed: state.completed.filter((task) => task.id !== action.payload),
            };
        },
        markAsCompleted: (state: StateType, action: PayloadAction<number>) => {
            const task = state.todo.find((task) => task.id === action.payload);
            if (task !== undefined) {
                return {
                    todo: state.todo.filter(
                        (task) => task.id !== action.payload
                    ),
                    completed: [
                        ...state.completed,
                        { ...task, isCompleted: true, pomodorosRemaining: 0, pomodorosCompleted: task.pomodorosCompleted + 1 },
                    ],
                };
            }
            return state;
        },
        markAsTodo: (state: StateType, action: PayloadAction<number>) => {
            const task = state.completed.find(
                (task) => task.id === action.payload
            );
            if (task !== undefined) {
                return {
                    todo: [
                        ...state.todo,
                        { ...task, isCompleted: false, pomodorosRemaining: 1 },
                    ],
                    completed: state.completed.filter(
                        (task) => task.id !== action.payload
                    ),
                };
            }
            return state;
        },
        refreshOrder: (state: StateType, action: PayloadAction<Task[]>) => {
            return { ...state, todo: action.payload };
        },
        updatePomodorosCount: (
            state: StateType,
            action: PayloadAction<number>
        ) => {
            if (state.todo.length === 0) return state;
            const tasks: Task[] = state.todo.map((task) => {
                if (task.id === action.payload) {
                    if (task.pomodorosRemaining === 1){
                        return task
                    } else {
                        return { ...task, pomodorosRemaining: task.pomodorosRemaining - 1, pomodorosCompleted: task.pomodorosCompleted + 1};
                    }
                } else return task;
            });
            return { ...state, todo: tasks };
        },
    },
});

export const {
    createTask,
    markAsCompleted,
    markAsTodo,
    removeTask,
    refreshOrder,
    updatePomodorosCount,
} = tasksSlice.actions;
export default tasksSlice.reducer;
