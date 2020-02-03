import React, { useRef, useContext } from "react";
import { TasksContext } from "./TaskProvider";

export default ({ tasks, history }) => {
  const { deleteTasks, editTasks } = useContext(TasksContext);

  const date = tasks.completionDate.split("-");
  let currentMonth = date[1];
  let currentDate = date[2];
  let currentYear = date[0];

  switch (currentMonth) {
    case "01":
      currentMonth = "January";
      break;
    case "02":
      currentMonth = "February";
      break;
    case "03":
      currentMonth = "March";
      break;
    case "04":
      currentMonth = "April";
      break;
    case "05":
      currentMonth = "May";
      break;
    case "06":
      currentMonth = "June";
      break;
    case "07":
      currentMonth = "July";
      break;
    case "08":
      currentMonth = "August";
      break;
    case "09":
      currentMonth = "September";
      break;
    case "10":
      currentMonth = "October";
      break;
    case "11":
      currentMonth = "November";
      break;
    case "12":
      currentMonth = "December";
      break;
  }

  return (
    <section className="task">
      <div className="taskCardInfo">
        <span className="taskInfo">To Do:</span>
        <em> {tasks.name}</em>
      </div>
      <div className="taskCardInfo">
        <span className="taskInfo">Due Date:</span>
        <em>
          {" "}
          {currentMonth} {currentDate}, {currentYear}
        </em>
      </div>
      <div className="taskCardInfo">
        <span className="taskInfo">Task Completed:</span>{" "}
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
        />
      </div>

      <button onClick={() => history.push(`/tasks/edit/${tasks.id}`)} className="editTask btn-edit-delete btn btn-light">
        Edit Task
      </button>

      <button
        onClick={() => {
          if (window.confirm("Are you sure?")) {
            deleteTasks(tasks).then(() => history.push("/"));
          }
        }}
        className="editTask btn-edit-delete btn btn-light">
        Delete Task
      </button>
    </section>
  );
};
