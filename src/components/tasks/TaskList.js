import React, { useContext } from "react";
import { TasksContext } from "./TaskProvider";
import Task from "./Task";
import "./Tasks.css";

export default props => {
  const { tasks } = useContext(TasksContext);

  const userId = localStorage.getItem("nutshell_user");

  const foundTask = tasks.filter(task => task.userId === parseInt(userId, 10));

  const visibleTasks = foundTask.filter(task => task.isCompleted === false);

  const sortedTasks = visibleTasks.sort((taskA, taskB) => Date.parse(taskA.completionDate) - Date.parse(taskB.completionDate));

  return (
    <>
      <h1>Tasks</h1>

      <button onClick={() => props.history.push("/tasks/create")}>Create Task</button>
      <div className="tasks">
        {sortedTasks.map(singleTask => {
          return <Task {...props} key={singleTask.id} tasks={singleTask} />;
        })}
      </div>
    </>
  );
};
