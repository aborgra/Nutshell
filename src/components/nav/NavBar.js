import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { UserContext } from "../users/UserProvider";

export default props => {

const { users } = useContext(UserContext)
  const activeUserId = parseInt(localStorage.getItem("nutshell_user"))
  const activeUser = users.find(user => user.id === activeUserId)
  console.log(activeUserId)

  return (
    <ul className="navbar">
      <div className="navbar__message">{activeUser.userName} - Moving at the speed of sloth</div>
{
    localStorage.getItem("nutshell_user")
        ? <li className="navbar__item">
            <Link className="navbar__link"
                to=""
                onClick={e => {
                    e.preventDefault()
                    localStorage.removeItem("nutshell_user")
                    props.history.push("/")
                }}
            >Logout</Link>
        </li>
        : ""
}
      
    </ul>
  );
};