'use client';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import React, { useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type { Task } from '@/redux/slices/tasks';
import {
  createTask,
  removeTask,
  switchIsDoneStatus,
} from '@/redux/slices/tasks';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { DeleteForever } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';

export default function TasksList(): React.ReactElement {
  const tasks = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  return (
    <div className='flex flex-col rounded-xl border bg-zinc-100 p-4 py-5 shadow-lg'>
      <div className='flex items-center justify-between'>
        <p className='text-2xl font-extrabold text-zinc-700'>Tasks</p>
      </div>
      <hr className='pb-3' />
      {tasks.length > 0 && (
        <div className='mb-2 flex flex-col gap-2'>
          {tasks.map((task, index) => (
            <div className='flex items-center gap-1' key={index}>
              <TaskItem task={task} key={task.id} />
              <button onClick={() => dispatch(removeTask(task.id))}>
                <DeleteForever
                  className='text-zinc-700'
                  sx={{ fontSize: '20px' }}
                />
              </button>
            </div>
          ))}
        </div>
      )}
      <AddTaskItem />
    </div>
  );
}

type TaskItemProps = {
  task: Task;
};

function TaskItem({ task }: TaskItemProps): React.ReactElement {
  const [isHoveringDoneCheckbox, setIsHoveringDoneCheckbox] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className='relative flex flex-1 items-center justify-between rounded-lg border border-zinc-300 bg-zinc-200 p-2'>
      <div className='flex gap-1'>
        <div
          className='flex'
          onMouseOver={() => {
            setIsHoveringDoneCheckbox(true);
          }}
          onMouseOut={() => {
            setIsHoveringDoneCheckbox(false);
          }}
          onClick={() => dispatch(switchIsDoneStatus(task.id))}
        >
          {task.isDone || isHoveringDoneCheckbox ? (
            <CheckCircleOutlineIcon
              className='text-zinc-700'
              sx={{ fontSize: '20px' }}
            />
          ) : (
            <RadioButtonUncheckedIcon
              className='text-zinc-700'
              sx={{ fontSize: '20px' }}
            />
          )}
        </div>
        <p
          className={`${task.isDone ? 'line-through' : 'no-underline'} text-sm `}
        >
          {task.title}
        </p>
      </div>
      <p className='text-xs text-zinc-500'>
        Pomodoros estimated: {task.pomodoros}
      </p>
    </div>
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
        pomodoros: pomodorosEstimated,
        isDone: false,
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
        <div className='relative flex rounded-lg border border-zinc-300 bg-zinc-200 p-2'>
          <input
            type='text'
            autoFocus
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value);
            }}
            placeholder='Try tiping: Making a tomacco tea'
            className='flex-grow bg-transparent text-sm text-zinc-700 outline-none placeholder:text-zinc-400'
            onKeyDown={(e) => {
              handleEnter(e);
            }}
          />
          {taskTitle.trim().length > 0 && (
            <div className='flex gap-1'>
              <button
                className='relative flex justify-center rounded-sm'
                type='button'
                onClick={() => {
                  handleCreateTask();
                }}
              >
                <SendIcon className='text-zinc-500' sx={{ fontSize: '20px' }} />
              </button>
              <button
                className='relative flex justify-center rounded-sm hover:bg-zinc-300'
                type='button'
                onClick={() => {
                  setIsVisiblePomodoroCounter(!isVisiblePomodoroCounter);
                }}
              >
                <RepeatOneIcon
                  className='text-zinc-400'
                  sx={{ fontSize: '20px' }}
                />
              </button>
            </div>
          )}
          <button
            className='ml-1 flex justify-center rounded-sm hover:bg-zinc-300'
            onClick={handleCloseTask}
          >
            <ClearIcon className='text-zinc-400' sx={{ fontSize: '20px' }} />
          </button>
          {isVisiblePomodoroCounter && taskTitle.trim().length > 0 && (
            <div
              className='absolute -right-0 -top-10 rounded-lg border border-zinc-300 bg-zinc-200 p-1'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className='flex items-center gap-x-1.5'>
                <button
                  type='button'
                  className='inline-flex size-6 items-center justify-center gap-x-2 rounded-md border border-zinc-300 bg-zinc-200 text-sm font-medium text-gray-800 shadow-sm hover:bg-zinc-300 disabled:pointer-events-none disabled:opacity-50'
                  onClick={() => {
                    setPomodorosEstimated(pomodorosEstimated - 1);
                  }}
                >
                  <RemoveIcon
                    className='text-zinc-700'
                    sx={{ fontSize: '12px' }}
                  />
                </button>
                <input
                  className='w-6 border-0 bg-transparent p-0 text-center text-sm text-gray-800 outline-none focus:ring-0'
                  type='text'
                  value={pomodorosEstimated}
                  onChange={(e) => {
                    handleChangePomodoroRequiredInput(e);
                  }}
                />
                <button
                  type='button'
                  className='inline-flex size-6 items-center justify-center gap-x-2 rounded-md border border-zinc-300 bg-zinc-200 text-sm font-medium text-gray-800 shadow-sm hover:bg-zinc-300 disabled:pointer-events-none disabled:opacity-50'
                  onClick={() => {
                    setPomodorosEstimated(pomodorosEstimated + 1);
                  }}
                >
                  <AddIcon
                    className='text-zinc-700'
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
          className='flex items-center gap-1 rounded-lg border border-dashed border-zinc-400 bg-zinc-200 p-2 hover:cursor-text hover:bg-zinc-300'
        >
          <AddCircleIcon className='text-zinc-700' sx={{ fontSize: '20px' }} />
          <p className='text-sm text-zinc-700'> Add a task</p>
        </div>
      )}
    </>
  );
}
