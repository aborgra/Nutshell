import React, {useState, useEffect } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
  const [users, setUsers] = useState([])

  const getUsers = () => {
    return fetch("http://localhost:3000/users")
          .then(res => res.json())
          .then(setUsers)
  }

  const addUser = user => {
    return fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(getUsers)
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    console.log("***Users APP STATE CHANGED")
  }, [users])

  return (
    <UserContext.Provider value = {{
      users, addUser
    }}>
        {props.children}
    </UserContext.Provider>
  )
}