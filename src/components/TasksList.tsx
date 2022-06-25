import { v4 as uuidv4 } from 'uuid';

import clipboard from '../assets/clipboard.svg';
import plus from '../assets/plus.svg';

import styles from './TasksList.module.scss';
import { TaskRow } from './TaskRow';
import { FormEvent, useCallback, useState } from 'react';

type Tasks = {
  id: string;
  name: string;
  done: boolean;
}

export function TasksList() {
  const [tasks, setTasks] = useState<Tasks[]>([]);

  const tasksDone = tasks.reduce((acc, cur) => {
    if(cur.done === true) {
      acc++;
    }

    return acc;
  }, 0);

  function handleAddTask(event: FormEvent) {
    event.preventDefault();

    const newTaskName = event.target.taskName.value;
    const newTaskId = uuidv4();
    event.target.taskName.value = '';
    setTasks(prev => [...prev, { id: newTaskId, name: newTaskName, done: false }]);
  }

  const handleTaskDone = useCallback((taskId: string) => {
    const newTasks = tasks.map(task => {
      if(task.id === taskId) {
        task.done = !task.done;
      }

      return task;
    });

    setTasks(newTasks);
  }, [tasks]);

  const handleTaskDeleted = useCallback((taskId: string) => {
    const newTasks = tasks.filter(task => task.id !== taskId);

    setTasks(newTasks);
  }, [tasks]);

  return (
    <>
      <form onSubmit={handleAddTask} className={styles.form_component}>
        <input 
          type="text"
          name="taskName"
          placeholder='Adicionar uma nova tarefa'
          required
        />
        <button type="submit">
          Criar
          <img src={plus} alt="Plus" />
        </button>
      </form>

      <section className={styles.tasks}>
        <div className={styles.tasks_container}>
          <div className={styles.created}>
            Tarefas criadas
            <span>0</span>
          </div>
          <div className={styles.done}>
            Concluídas
            {tasks.length === 0 ? (
              <span>{tasks.length}</span>
            ) : (
              <span>
                {tasksDone} de {tasks.length}
              </span>
            )}
          </div>
        </div>

        <div className={styles.tasks_list}>
          { tasks.length === 0 ? (
            <div className={styles.empty}>
              <img src={clipboard} alt="notepad" />

              <div>
                <p>Você ainda não tem tarefas cadastradas</p>
                <p>Crie tarefas e organize seus itens a fazer</p>
              </div>
            </div>
          )
          : (
            <div className={styles.not_empty}>
              {tasks.map(task => (
                <TaskRow key={task.id} task={task} onTaskDone={handleTaskDone} onTaskDeleted={handleTaskDeleted} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}