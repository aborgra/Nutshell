import React, { useState, useEffect } from "react";

export const TasksContext = React.createContext();

export const TasksProvider = props => {
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    return fetch("http://localhost:3000/tasks")
      .then(res => res.json())
      .then(setTasks)
      .slice()
      .sort((currentTask, nextTask) => Date.parse(currentTask.completionDate) - Date.parse(nextTask.completionDate));
  };

  const addTasks = task => {
    return fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    }).then(getTasks);
  };

  const updateTasks = taskObject => {
    return fetch(`http://localhost:3000/tasks/${taskObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskObject)
    }).then(getTasks);
  };

  const deleteTasks = task => {
    return fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE"
    }).then(getTasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    console.log("****  TASKS APPLICATION STATE CHANGED  ****");
  }, [tasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTasks,
        updateTasks,
        deleteTasks
      }}>
      {props.children}
    </TasksContext.Provider>
  );
};
