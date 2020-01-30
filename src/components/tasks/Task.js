import React from "react";

export default ({ tasks }) => {
  return (
    <section className="customer">
      <h3 className="customer__name">{tasks.user.name}</h3>
      <div class="taskCardInfo">
        To Do:
        <ul>
          <li>${tasks.name}</li>
        </ul>
      </div>
      <div class="taskCardInfo">
        Date:
        <ul>
          <li>${tasks.completionDate}</li>
        </ul>
      </div>
      <div>
        Task Completed: <input id="hideTask--${tasks.id}" class="hideTask" type="checkbox" />
      </div>
      <button id="editTask--${tasks.id}" class="editTask btn btn-secondary">
        Edit Task
      </button>
    </section>
  );
};
