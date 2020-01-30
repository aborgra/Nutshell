import React, { useContext, useRef } from "react";
import { FriendContext } from "./FriendProvider";
import { UserContext } from "../users/UserProvider";
import Friend from "./Friend";
import "./Friend.css";

export default () => {
  const { friends, addFriend } = useContext(FriendContext);
  const { users } = useContext(UserContext);
  const [friend, setFriend] = useState({});
  const friendName = useRef("");

  const handleControlledInputChange = event => {
    const newFriend = Object.assign({}, friend);
    newFriend[event.target.name] = event.target.value;
    setFriend(newFriend);
  };

  const constructNewFriend = () => {
    const friendUserName = { friendName };
    const foundUser = users.find(user => user.userName === friendUserName);
    if (foundUser === undefined) {
      alert("User not found");
    } else {
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
    }
  };

  return (
    <div className="friends">
      <input
        type="text"
        name="name"
        ref={friendName}
        required
        className="form-control"
        proptype="varchar"
        placeholder="Friend name"
        defaultValue={""}
        onChange={handleControlledInputChange}
      />
      <button
        type="submit"
        onClick={evt => {
          evt.preventDefault();
          constructNewFriend();
        }}
        className="btn btn-primary"
      ></button>

      {friends.map(friend => (
        <Friend key={friend.id} Friend={friend} />
      ))}
    </div>
  );
};
