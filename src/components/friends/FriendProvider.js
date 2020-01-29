import React, {useState, useEffect } from "react"

export const FriendContext = React.createContext()

export const FriendProvider = (props) => {
  const [friends, setFriends] = useState([])

  const getFriends = () => {
    return fetch("http://localhost:3000/friends")
          .then(res => res.json())
          .then(setFriends)
  }

  const addFriend = friend => {
    return fetch("http://localhost:3000/friends", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(friend)
    })
      .then(getFriends)
  }

  const deleteFriend = friend => {
    return fetch(`http://localhost:3000/friends/${friend.id}`, {
      method: "DELETE",
    })
      .then(getFriends)
  }

  


  useEffect(() => {
    getFriends()
  }, [])

  useEffect(() => {
    console.log("***Friends APP STATE CHANGED")
  }, [friends])

  return (
    <FriendContext.Provider value = {{
      friends, addFriend, deleteFriend
    }}>
        {props.children}
    </FriendContext.Provider>
  )
}