import React, { useRef, useContext } from "react";
import { TasksContext } from "./TaskProvider";

export default ({ tasks, history }) => {
  const { deleteTasks, editTasks } = useContext(TasksContext);

  const taskCompleted = useRef(null);

  return (
    <section className="task">
      <h5 className="user__name">{tasks.user.userName}</h5>
      <div className="taskCardInfo">
        To Do:  {tasks.name}
      </div>
      <div className="taskCardInfo">
        Date:  {tasks.completionDate}
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
      <button onClick={() => history.push(`/tasks/edit/${tasks.id}`)} className="editTask btn btn-light">
        Edit
      </button>
      <button onClick={() => deleteTasks(tasks).then(() => history.push("/"))} className="editTask btn btn-light">
        Delete
      </button>
    </section>
  );
};
