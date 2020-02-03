import React, { useContext } from "react";
import { TasksContext } from "./TaskProvider";
import { UserContext } from "../users/UserProvider";
import Task from "./Task";
import "./Tasks.css";

export default props => {
  const { tasks } = useContext(TasksContext);
  const { users } = useContext(UserContext);

  const userId = localStorage.getItem("nutshell_user");

  const foundTask = tasks.filter(task => task.userId === parseInt(userId, 10));

  const visibleTasks = foundTask.filter(task => task.isCompleted === false);

  const sortedTasks = visibleTasks.sort((taskA, taskB) => Date.parse(taskA.completionDate) - Date.parse(taskB.completionDate));

  const currentUser = users.filter(user => user.id === parseInt(userId));

  return (
    <>
      <h2 className="user__name">{currentUser.map(user => user.userName)}'s Tasks</h2>

      <button className="btn btn-primary" onClick={() => props.history.push("/tasks/create")}>
        Create Task
      </button>
      <div className="tasks">
        {sortedTasks.map(singleTask => {
          return <Task {...props} key={singleTask.id} tasks={singleTask} />;
        })}
      </div>
    </>
  );
};
