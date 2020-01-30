import React from "react";

export default ({ message, history }) => {
  debugger
  const userId = parseInt(localStorage.getItem("nutshell_user"));
  let editMessageButton = "";
  if (message.userId === userId) {
    editMessageButton = 
      <>
        <button
          onClick={() => {
            history.push(`/editMessage/${message.id}`);
          }}
        >
          Edit Messge
        </button>
      </>
    
  }

  return (
    <section className="message">
      <h3 className="message__name">{message.user.userName}</h3>
      <div className="message__text">{message.message}</div>
      {editMessageButton}
    </section>
  );
};
