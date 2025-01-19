'use client';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useEffect, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    createTask,
    updatePomodorosCount,
    markAsCompleted,
    refreshOrder,
    removeTask,
} from '@/redux/slices/tasks';

import { DeleteForever } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';
import { TaskItem } from './TaskItem';
import Divider from './Divider';

export default function TasksList(): React.ReactElement {
    const tasks = useAppSelector((state) => state.tasks);
    const pomodoro = useAppSelector((state) => state.countdown);
    const dispatch = useAppDispatch();

    function handleDragEnd(event: DragEndEvent): void {
        const { active, over } = event;

        if (over == null || active.id === over.id) return;

        const activeTask = tasks.todo.find((task) => task.id === active.id);
        const overTask = tasks.todo.find((task) => task.id === over.id);

        if (activeTask == null || overTask == null) {
            return;
        }

        const olderIndex = tasks.todo.findIndex(
            (task) => task.id === active.id
        );
        const newIndex = tasks.todo.findIndex((task) => task.id === over.id);
        const newTasks = arrayMove(tasks.todo, olderIndex, newIndex);
        dispatch(refreshOrder(newTasks));
    }

    useEffect(() => {
        if (tasks.todo.length > 0) {
            if (pomodoro.currentTime === 0 && pomodoro.status === 'Focus') {
                const activeTask = tasks.todo[0];
                if (activeTask.pomodorosRemaining === 1) {
                    dispatch(markAsCompleted(activeTask.id));
                } else {
                    dispatch(updatePomodorosCount(activeTask.id));
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pomodoro.currentInterval, pomodoro.currentTime, pomodoro.status]);

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <div className="flex flex-col rounded-xl border border-zinc-300 bg-zinc-100 p-4 py-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-extrabold text-zinc-700">
                        Tasks
                    </p>
                </div>
                <hr className="pb-3 border-zinc-300" />
                <div className='pb-2'>
                    <AddTaskItem />
                </div>
                <SortableContext
                    items={tasks.todo}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.todo.length > 0 && (
                        <div className="mb-2 flex flex-col gap-2">
                            {tasks.todo.map((task, index) => (
                                <div
                                    className="flex items-center gap-1 max-w-full"
                                    key={index}
                                >
                                    <TaskItem task={task} key={task.id} />
                                    <button
                                        onClick={() =>
                                            dispatch(removeTask(task.id))
                                        }
                                    >
                                        <DeleteForever
                                            className="text-zinc-700"
                                            sx={{ fontSize: '20px' }}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </SortableContext>
                {tasks.completed.length > 0 && (
                    <div className="py-2 flex flex-col gap-2">
                        <Divider title="Completed" />
                        {tasks.completed.map((task, index) => (
                            <div
                                className="flex items-center gap-1 max-w-full"
                                key={index}
                            >
                                <TaskItem task={task} key={task.id} />
                                <button
                                    onClick={() =>
                                        dispatch(removeTask(task.id))
                                    }
                                >
                                    <DeleteForever
                                        className="text-zinc-700"
                                        sx={{ fontSize: '20px' }}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DndContext>
    );
}

function AddTaskItem(): React.ReactElement {
    const [isVisibleNewTask, setIsVisibleNewTask] = useState(false);
    const [isVisiblePomodoroCounter, setIsVisiblePomodoroCounter] =
        useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [pomodorosEstimated, setPomodorosEstimated] = useState(1);

    const dispatch = useAppDispatch();

    function handleChangePomodoroRequiredInput(
        event: ChangeEvent<HTMLInputElement>
    ): void {
        const value = Number(event.target.value);
        if (isNaN(value)) return;
        setPomodorosEstimated(value);
    }

    function handleCreateTask(): void {
        setTaskTitle('');
        setPomodorosEstimated(1);
        handleCloseTask();
        dispatch(
            createTask({
                id: new Date().getMilliseconds(),
                title: taskTitle,
                pomodorosRemaining: pomodorosEstimated,
                pomodorosCompleted: 0,
                isCompleted: false,
            })
        );
    }

    function handleEnter(event: KeyboardEvent<HTMLInputElement>): void {
        if (event.key === 'Enter' && taskTitle.length > 0) {
            handleCreateTask();
        }
    }

    function handleCloseTask(): void {
        setIsVisiblePomodoroCounter(false);
        setIsVisibleNewTask(false);
    }

    return (
        <>
            {isVisibleNewTask ? (
                <div className="relative flex rounded-lg border border-zinc-300 bg-zinc-200 p-2">
                    <input
                        type="text"
                        autoFocus
                        value={taskTitle}
                        onChange={(e) => {
                            setTaskTitle(e.target.value);
                        }}
                        placeholder="Try tiping: Making a tomacco tea"
                        className="flex-grow bg-transparent text-sm text-zinc-700 outline-none placeholder:text-zinc-400"
                        onKeyDown={(e) => {
                            handleEnter(e);
                        }}
                    />
                    {taskTitle.trim().length > 0 && (
                        <div className="flex gap-1">
                            <button
                                className="relative flex justify-center rounded-sm"
                                type="button"
                                onClick={() => {
                                    handleCreateTask();
                                }}
                            >
                                <SendIcon
                                    className="text-zinc-500"
                                    sx={{ fontSize: '20px' }}
                                />
                            </button>
                            <button
                                className="relative flex justify-center rounded-sm hover:bg-zinc-300"
                                type="button"
                                onClick={() => {
                                    setIsVisiblePomodoroCounter(
                                        !isVisiblePomodoroCounter
                                    );
                                }}
                            >
                                <RepeatOneIcon
                                    className="text-zinc-400"
                                    sx={{ fontSize: '20px' }}
                                />
                            </button>
                        </div>
                    )}
                    <button
                        className="ml-1 flex justify-center rounded-sm hover:bg-zinc-300"
                        onClick={handleCloseTask}
                    >
                        <ClearIcon
                            className="text-zinc-400"
                            sx={{ fontSize: '20px' }}
                        />
                    </button>
                    {isVisiblePomodoroCounter &&
                        taskTitle.trim().length > 0 && (
                            <div
                                className="absolute -right-0 -top-10 rounded-lg border border-zinc-300 bg-zinc-200 p-1"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <div className="flex items-center gap-x-1.5">
                                    <button
                                        type="button"
                                        className="inline-flex size-6 items-center justify-center gap-x-2 rounded-md border border-zinc-300 bg-zinc-200 text-sm font-medium text-gray-800 shadow-sm hover:bg-zinc-300 disabled:pointer-events-none disabled:opacity-50"
                                        onClick={() => {
                                            setPomodorosEstimated(
                                                pomodorosEstimated - 1
                                            );
                                        }}
                                    >
                                        <RemoveIcon
                                            className="text-zinc-700"
                                            sx={{ fontSize: '12px' }}
                                        />
                                    </button>
                                    <input
                                        className="w-6 border-0 bg-transparent p-0 text-center text-sm text-gray-800 outline-none focus:ring-0"
                                        type="text"
                                        value={pomodorosEstimated}
                                        onChange={(e) => {
                                            handleChangePomodoroRequiredInput(
                                                e
                                            );
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="inline-flex size-6 items-center justify-center gap-x-2 rounded-md border border-zinc-300 bg-zinc-200 text-sm font-medium text-gray-800 shadow-sm hover:bg-zinc-300 disabled:pointer-events-none disabled:opacity-50"
                                        onClick={() => {
                                            setPomodorosEstimated(
                                                pomodorosEstimated + 1
                                            );
                                        }}
                                    >
                                        <AddIcon
                                            className="text-zinc-700"
                                            sx={{ fontSize: '12px' }}
                                        />
                                    </button>
                                </div>
                            </div>
                        )}
                </div>
            ) : (
                <div
                    onClick={() => {
                        setIsVisibleNewTask(true);
                    }}
                    className="flex items-center gap-1 rounded-lg border border-dashed border-zinc-400 bg-zinc-200 p-2 hover:cursor-text hover:bg-zinc-300"
                >
                    <AddCircleIcon
                        className="text-zinc-700"
                        sx={{ fontSize: '20px' }}
                    />
                    <p className="text-sm text-zinc-700"> Add a task</p>
                </div>
            )}
        </>
    );
}
