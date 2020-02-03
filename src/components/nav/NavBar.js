import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { UserContext } from "../users/UserProvider";

export default props => {

const { users } = useContext(UserContext)
  const activeUserId = parseInt(localStorage.getItem("nutshell_user"))
  const activeUser = users.find(user => user.id === activeUserId) || {}
  console.log(activeUserId)

  return (
    <ul className="navbar">
      <h3 className="navbar__message">{activeUser.userName} - Moving at the speed of sloth.</h3>
{
    localStorage.getItem("nutshell_user")
        ? <li className="navbar__item">
          <button className= "logoutButton btn btn-secondary " onClick={e => {
                    e.preventDefault()
                    localStorage.removeItem("nutshell_user")
                    props.history.push("/")
                }}>
            Log Out
          </button>
  
        </li>
        : ""
}
      
    </ul>
  );
};