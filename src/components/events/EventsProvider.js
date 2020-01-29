import React, {useState, useEffect } from "react"

export const EventContext = React.createContext()

export const EventProvider = (props) => {
  const [events, setEvents] = useState([])

  const getEvents = () => {
    return fetch("http://localhost:3000/events")
          .then(res => res.json())
          .then(setEvents)
  }

  const addEvent = event => {
    return fetch("http://localhost:3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Event)
    })
      .then(getEvents)
  }

  const editEvent = event => {
    return fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    })
      .then(getEvents)
  }

  const deleteEvent = event => {
    return fetch(`http://localhost:3000/events/${event.id}`, {
      method: "DELETE",
    })
      .then(getEvents)
  }

  


  useEffect(() => {
    getEvents()
  }, [])

  useEffect(() => {
    console.log("***Events APP STATE CHANGED")
  }, [events])

  return (
    <EventContext.Provider value = {{
      events, addEvent, deleteEvent, editEvent
    }}>
        {props.children}
    </EventContext.Provider>
  )
}