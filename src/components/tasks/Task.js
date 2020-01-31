import React, { useRef, useContext } from "react";
import { TasksContext } from "./TaskProvider";

export default ({ tasks, history }) => {
  const { deleteTasks, editTasks } = useContext(TasksContext);

  const taskCompleted = useRef(null);

  return (
    <section className="customer">
      <h3 className="customer__name">{tasks.user.userName}</h3>
      <div className="taskCardInfo">
        To Do:
        <ul>
          <li>{tasks.name}</li>
        </ul>
      </div>
      <div className="taskCardInfo">
        Date:
        <ul>
          <li>{tasks.completionDate}</li>
        </ul>
      </div>
      <div>
        Task Completed:{" "}
        <input
          onClick={() => {
            const hideTasks = {
              id: tasks.id,
              name: tasks.name,
              completionDate: tasks.completionDate,
              isCompleted: true,
              userId: parseInt(localStorage.getItem("nutshell_user"))
            };
            editTasks(hideTasks).then(() => history.push("/"));
          }}
          type="checkbox"
          ref={taskCompleted}
        />
      </div>
      <button onClick={() => history.push(`/tasks/edit/${tasks.id}`)} className="editTask btn btn-secondary">
        Edit Task
      </button>
      <button onClick={() => deleteTasks(tasks).then(() => history.push("/"))} className="editTask btn btn-secondary">
        Delete Task
      </button>
    </section>
  );
};
