import React, {useState, useEffect } from "react"

export const MessageContext = React.createContext()

export const MessageProvider = (props) => {
  const [messages, setMessages] = useState([])

  const getMessages = () => {
    return fetch("http://localhost:8088/messages?_expand=user")
          .then(res => res.json())
          .then(setMessages)
  }

  const addMessages = message => {
    return fetch("http://localhost:8088/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })
      .then(getMessages)
  }

  const editMessage = message => {
    return fetch(`http://localhost:8088/messages/${message.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    })
      .then(getMessages)
  }

  const deleteMessage = message => {
    return fetch(`http://localhost:8088/messages/${message.id}`, {
      method: "DELETE",
    })
      .then(getMessages)
  }

  


  useEffect(() => {
    getMessages()
  }, [])

  useEffect(() => {
    console.log("***Messages APP STATE CHANGED")
  }, [messages])

  return (
    <MessageContext.Provider value = {{
      messages, addMessages, deleteMessage, editMessage
    }}>
        {props.children}
    </MessageContext.Provider>
  )
}