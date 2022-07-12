import styles from "./app.module.css";
import { useState, FormEvent, ChangeEvent } from "react";
import { Header } from "./Header";
import { ClipboardText, PlusCircle } from "phosphor-react";
import "./global.css";
import { Task } from "./components/Task";
import { v4 as uuidv4 } from 'uuid';

interface toDoListData {
  id: string;
  status: "done" | "undone";
  content: string;
}

function App() {
  const [task, setTask] = useState("");
  const [toDoList, setToDoList] = useState<toDoListData[]>([]);

  const doneTasksCounter = toDoList.filter(toDo => toDo.status === "done");

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setTask(event.target.value);
  }

  function handleAddTaskToDoList(event: FormEvent) {
    event.preventDefault();

    const newTask: toDoListData = {
      id: uuidv4(),
      status: "undone",
      content: task,
    };

    setToDoList([...toDoList, newTask]);
    console.log(newTask);
    setTask("");
  }

  function handleToggleStatus(toDo: toDoListData) {
    const changedStatusToDoList = toDoList.map((task) => {
      if (task.content === toDo.content) {
        if (task.status === "undone") {
          task.status = "done";
        } else {
          task.status = "undone";
        }
      }

      return task;
    });

    setToDoList(changedStatusToDoList);
  }

  function handleRemoveTask(id: string) {
    const nonRemovedTasks = toDoList.filter((task) => task.id !== id);

    setToDoList(nonRemovedTasks);
  }

  return (
    <div className={styles.app}>
      <Header />
      <main>
        <form onSubmit={handleAddTaskToDoList}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            value={task}
            onChange={handleNewTaskChange}
          />
          <button type="submit">
            Criar
            <PlusCircle size={16} />
          </button>
        </form>
        <section className={styles.counterContainer}>
          <div>
            <strong>Tarefas criadas</strong>
            <p className={styles.counter}>{toDoList.length}</p>
          </div>
          <div>
            <strong>Concluídas</strong>
            <p className={styles.counter}>{doneTasksCounter.length} de {toDoList.length}</p>
          </div>
        </section>
        {toDoList.length === 0 ? (
          <ul>
            <ClipboardText size={70} />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </ul>
        ) : (
          toDoList.map((toDo) => (
            <Task
              key={toDo.id}
              ToDo={toDo}
              handleToggleStatus={handleToggleStatus}
              handleRemoveTask={handleRemoveTask}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default App;
