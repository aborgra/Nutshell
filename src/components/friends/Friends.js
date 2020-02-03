import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { FriendContext } from "../friends/FriendProvider"
import slothPic from "../pics/slothHeadshot.jpg"
import "./Friends.css"
export default ({ friend }) => {
  const { deleteFriend } = useContext(FriendContext)
  return (
    <section className="friend">
    <img className="friend__img " src={slothPic}/>
      <h3 className="friend__name">{friend.user.userName}</h3>
      <button className="btn btn-light"
        onClick={() => {
         const confirmDelete = window.confirm(`Are you sure you want to delete ${friend.user.userName}? `) 
          if (confirmDelete === true) {
            deleteFriend(friend)
         }
        }
          }
          
    
      >
        Remove Friend
      </button>
    </section>
  );
};
