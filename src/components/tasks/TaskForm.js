import React, { useContext, useRef } from "react";
import { TasksContext } from "./TaskProvider";
import "./Tasks.css";

export default props => {
  const { addTasks } = useContext(TasksContext);
  const tasksName = useRef("");
  const tasksDate = useRef(null);

  const constructNewTasks = () => {
    const tasksValue = tasksName.current.value;
    if (tasksValue === "") {
      alert("Please enter task");
    } else {
      addTasks({
        name: tasksValue,
        completionDate: tasksDate,
        isCompleted: false
      }).then(() => props.history.push("/tasks"));
    }
  };

  return (
    <form className="tasksForm">
      <h2 className="tasksForm__title">Tasks</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="tasksName">Tasks name</label>
          <br />
          <input type="text" name="tasksName" ref={tasksName} required autoFocus className="form-control" placeholder="Task name" />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Completion Date</label>
          <br />
          <input type="date" ref={tasksDate} />
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={clickEvent => {
          clickEvent.preventDefault();
          constructNewTasks();
        }}
        className="btn btn-primary">
        Save Tasks
      </button>
      <button
        onClick={clickEvent => {
          clickEvent.preventDefault();
          props.history.push("/tasks");
        }}>
        Close
      </button>
    </form>
  );
};
