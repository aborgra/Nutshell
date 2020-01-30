import React, { useContext, useRef, useState } from "react";
import { MessageContext } from "./MessageProvider";
import { UserContext } from "../users/UserProvider";
import Message from "./Message";
import "./Messages.css";

export default () => {
  const { messages, addMessages, editMessage } = useContext(
    MessageContext
  );
  const { users } = useContext(UserContext);
  // const [message, setMessage] = useState({});
  const messageText = useRef("");

  // const handleControlledInputChange = event => {
  //   const newMessage = Object.assign({}, message);
  //   newMessage[event.target.name] = event.target.value;
  //   setMessage(newMessage);
  // };

  const constructNewMessage = () => {
    const userId = parseInt(localStorage.getItem("nutshell_user"));
    const messageContent = messageText.current.value;
    addMessages({
      userId: userId,
      message: messageContent
    })
    .then(() => {messageText.current.value = ""})
  };

  

  return (
    
    <div className="messages">
      {messages.map(m => (
        <Message key={m.id} message={m} />
      ))}
      <form className="messagesForm">
      <textarea
        type="textarea"
        name="name"
        id="messageText"
        ref={messageText}
        required
        className="form-control"
        proptype="varchar"
        placeholder="message text"
        defaultValue={""}
        // onChange={handleControlledInputChange}
      />
      <button
        type="submit"
        onClick={evt => {
          evt.preventDefault();
          constructNewMessage();
        }}
        className="btn btn-primary"
      >
        Save Message
      </button>
      </form>

      
    </div>
  );
};
