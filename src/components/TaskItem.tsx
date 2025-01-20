import React, { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { markAsCompleted, markAsTodo, type Task } from '@/redux/slices/tasks';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface TaskItemProps {
    task: Task;
}

export function TaskItem({ task }: TaskItemProps): React.ReactElement {
    const [isHoveringDoneCheckbox, setIsHoveringDoneCheckbox] = useState(false);
    const dispatch = useAppDispatch();
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({
            id: task.id,
        });

    const style = React.useMemo(
        () => ({
            transform: CSS.Transform.toString(transform),
            transition,
        }),
        [transform, transition]
    );

    function handleTaskStatusChange(): void {
        if (!task.isCompleted) {
            dispatch(markAsCompleted(task.id));
        } else {
            dispatch(markAsTodo(task.id));
        }
    }

    return (
        <div
            {...attributes}
            {...listeners}
            ref={setNodeRef}
            style={style}
            className="relative flex flex-1 items-center justify-between rounded-lg border border-zinc-300 bg-zinc-200 p-2 break-words"
        >
            <div className="flex gap-1 items-center">
                <div
                    className="flex px-1"
                    onMouseOver={() => {
                        setIsHoveringDoneCheckbox(true);
                    }}
                    onMouseOut={() => {
                        setIsHoveringDoneCheckbox(false);
                    }}
                    onClick={() => {
                        handleTaskStatusChange();
                    }}
                    onPointerDown={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {task.isCompleted || isHoveringDoneCheckbox ? (
                        <CheckCircleOutlineIcon
                            className="text-zinc-700"
                            sx={{ fontSize: '20px' }}
                        />
                    ) : (
                        <RadioButtonUncheckedIcon
                            className="text-zinc-700"
                            sx={{ fontSize: '20px' }}
                        />
                    )}
                </div>
                <p
                    className={`text-sm break-all overflow-hidden text-ellipsis`}
                >
                    {task.title}
                </p>
            </div>
            <p className="text-sm font-bold text-zinc-500 px-1">
                {task.isCompleted
                    ? task.pomodorosCompleted
                    : task.pomodorosRemaining}
            </p>
        </div>
    );
}
