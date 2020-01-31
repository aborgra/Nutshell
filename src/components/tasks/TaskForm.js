import React, { useContext, useState, useEffect, useRef } from "react";
import { TasksContext } from "./TaskProvider";

export default props => {
  const { addTasks, tasks, editTasks } = useContext(TasksContext);
  const [task, setTasks] = useState({});
  const dateCompleted = useRef(null);

  const editMode = props.match.params.hasOwnProperty("tasksId");

  const handleControlledInputChange = event => {
    /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
    const newTask = Object.assign({}, task);
    newTask[event.target.name] = event.target.value;
    setTasks(newTask);
  };

  const setDefaults = () => {
    if (editMode) {
      const taskId = parseInt(props.match.params.tasksId);
      const selectedTask = tasks.find(singleTask => singleTask.id === taskId) || {};
      setTasks(selectedTask);
    }
  };

  useEffect(() => {
    setDefaults();
  }, [tasks]);

  const constructNewTask = () => {
    if (task.name === "") {
      window.alert("Please enter task");
    } else {
      if (editMode) {
        console.log(task.id);
        editTasks({
          id: task.id,
          name: task.name,
          completionDate: dateCompleted.current.value,
          isCompleted: false,
          userId: parseInt(localStorage.getItem("nutshell_user"))
        }).then(() => props.history.push("/"));
      } else {
        addTasks({
          name: task.name,
          completionDate: dateCompleted.current.value,
          isCompleted: false,
          userId: parseInt(localStorage.getItem("nutshell_user"))
        }).then(() => props.history.push("/"));
      }
    }
  };

  return (
    <form className="taskForm">
      <h2 className="taskForm__title">{editMode ? "Update Task" : "Save Task"}</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Task name: </label>
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="form-control"
            proptype="varchar"
            placeholder="Task name"
            defaultValue={task.name}
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="tasks">Task Date: </label>
          <input type="date" name="date" ref={dateCompleted} required className="form-control" defaultValue={task.completionDate} onChange={handleControlledInputChange} />
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={clickEvent => {
          clickEvent.preventDefault();
          constructNewTask();
        }}
        className="btn btn-primary">
        {editMode ? "Save Updates" : "Create Tasks"}
      </button>
      <button onClick={() => props.history.push("/")}>Close</button>
    </form>
  );
};
