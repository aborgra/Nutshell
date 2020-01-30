import React, { useContext } from "react";
import { UserContext } from "../users/UserProvider";
import { FriendContext } from "../friends/FriendProvider";


export default ({ message, history }) => {
  const userId = parseInt(localStorage.getItem("nutshell_user"));
  const { users } = useContext(UserContext);
  const { friends, addFriend } = useContext(FriendContext);


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


  const constructNewFriend = () => {
    const confirmFriend = window.confirm(`Add ${message.user.userName} as a new friend??`);
    if (confirmFriend === true) {
    const friendUserName = message.user.userName 
    const friendInitiateId = parseInt(localStorage.getItem("nutshell_user"))
    const foundUser = users.find(user => user.userName === friendUserName);
    const foundExistingFriend = friends.find(
        friendRel =>
          friendRel.userId === foundUser.id &&
          friendInitiateId === friendRel.friendInitiateId
      );
      if (friendInitiateId !== foundUser.id) {
        if (foundExistingFriend === undefined) {
          addFriend({
            userId: foundUser.id,
            friendInitiateId: parseInt(localStorage.getItem("nutshell_user"))
          });
          // .then(() => props.history.push("/"));
        } else {
          alert("User is already a friend");
        }
      } else {
        alert("You can't add yourself, dummy");
      }
    }}
  

  return (
    <section className="message">
      <h3 className="message__name"
      onClick={evt => {
        evt.preventDefault();
        constructNewFriend(message.user)
      }}>{message.user.userName}
      </h3>
      <div className="message__text">{message.message}</div>
      {editMessageButton}
    </section>
  );
};
