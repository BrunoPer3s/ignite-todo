import { Check, Trash } from "phosphor-react";
import styles from './task.module.css';

interface toDoListData {
  id: string;
  status: 'done' | 'undone';
  content: string;
};

interface TaskProps {
  ToDo: toDoListData;
  handleRemoveTask: (id: string) => void;
  handleToggleStatus: (task: toDoListData) => void;
}

export function Task ({ handleRemoveTask, handleToggleStatus, ToDo }: TaskProps) {
  return (
    <section className={styles.wrapper}>
        <div className={styles.container}>
          {ToDo.status === 'undone' ? (
            <button 
              className={styles.statusUndone}
              onClick={() => handleToggleStatus(ToDo)}
            />
          ) : (
            <button 
              className={styles.statusDone}
              onClick={() => handleToggleStatus(ToDo)}
            >
              <Check size={10}/>
            </button>
          )}
          {ToDo.status === 'undone' ? (
            <p className={styles.undoneParagraph}>
            {ToDo.content}
          </p>
          ) : <p className={styles.doneParagraph}>
          {ToDo.content}
        </p>}
        </div>
        <button 
          className={styles.trash}
          onClick={() => handleRemoveTask(ToDo.id)}
        >
          <Trash size={16}/>
        </button>
    </section>
  )
}