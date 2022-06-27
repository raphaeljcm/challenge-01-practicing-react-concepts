import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import done from '../assets/done.svg';
import trash from '../assets/trash.svg';

import styles from './TaskRow.module.scss';

interface TaskRowProps {
  index: number;
  task: {
    id: string;
    name: string;
    done: boolean;
  }
  onTaskDone: (taskId: string) => void;
  onTaskDeleted: (taskId: string) => void;
  onMove: (from: number, to: number) => void;
}

export function TaskRow({ task, onTaskDone, onTaskDeleted, index, onMove }: TaskRowProps) {
  const ref = useRef<HTMLDivElement>(null);

  // drag and drop
  const [{ isDragging }, dragRef] = useDrag({
    type: 'TASK',
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, dropRef] = useDrop({
    accept: 'TASK',
    hover(item: TaskRowProps, monitor) {
      const draggedIndex = item.index;
      const targetIndex = index;

      // it's the same card
      if(draggedIndex === targetIndex) {
        return;
      }

      if(ref.current !== null) {
        const targetSize = ref.current.getBoundingClientRect();
        const targetCenter = (targetSize.bottom - targetSize.top) / 2;

        const draggedOffset = monitor.getClientOffset()!;
        const draggedTop = draggedOffset.y - targetSize.top;

        // if it's before the target top, I won't do anything
        if(draggedIndex < targetIndex && draggedTop < targetCenter) {
          return;
        }

        // if it's after the target bottom, I also won't do anything
        if(draggedIndex > targetIndex && draggedTop > targetCenter) {
          return;
        }

        onMove(draggedIndex, targetIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = targetIndex;
      }
    }
  });

  dragRef(dropRef(ref));

  return (
    <div className={`${styles.row} ${isDragging ? styles.is_dragging : ''}`} ref={ref}>
      <div onClick={() => onTaskDone(task.id)} className={task.done ? styles.done : ''}>
        {task.done && (
          <img src={done} alt="task done check" />
        )}
      </div>
      <p>{task.name}</p>
      <button onClick={() => onTaskDeleted(task.id)} type='button'>
        <img src={trash} alt="trash" />
      </button>
    </div>
  );
}