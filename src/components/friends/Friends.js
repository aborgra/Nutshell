import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { FriendContext } from "../friends/FriendProvider"

export default ({ Friend }) => {

  const { deleteFriend } = useContext(FriendContext)

  return (
    <section className="friend">
    <img class="friend__img card-img-top" src="./pics/sloth.jpg"/>
      <h3 className="friend__name">{Friend.name}</h3>
      <button
        onClick={() => {
          deleteFriend(Friend)
          // .then(() => {props.history.push("/")});
        }}
      >
        Delete Friend
      </button>
    </section>
  );
};
