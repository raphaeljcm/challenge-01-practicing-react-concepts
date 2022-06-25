import done from '../assets/done.svg';
import trash from '../assets/trash.svg';

import styles from './TaskRow.module.scss';

interface TaskRowProps {
  task: {
    id: string;
    name: string;
    done: boolean;
  }
  onTaskDone: (taskId: string) => void;
  onTaskDeleted: (taskId: string) => void;
}

export function TaskRow({ task, onTaskDone, onTaskDeleted }: TaskRowProps) {
  return (
    <div className={styles.row}>
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