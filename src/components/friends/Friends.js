import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { FriendContext } from "../friends/FriendProvider"
import slothPic from "../pics/slothPic.jpg"
import "./Friends.css"
export default ({ friend }) => {
  const { deleteFriend } = useContext(FriendContext)
  return (
    <section className="friend">
    <img className="friend__img " src={slothPic}/>
      <h3 className="friend__name">{friend.user.userName}</h3>
      <button className="btn btn-light"
        onClick={() => {
          deleteFriend(friend)
          // .then(() => {props.history.push("/")});
        }}
      >
        Remove Friend
      </button>
    </section>
  );
};
