import React, { useContext } from "react"
import { EventContext } from "./EventsProvider"
// import "./Events.css"


export default ({event, props, friend, next}) => {

    const { deleteEvent } = useContext(EventContext)

    let eventSectionClass = "event"
    let eventDeleteButton = ""
    let eventEditButton = ""

    if (friend === true) {
        eventSectionClass = "friendEvent"
    } else {
        eventDeleteButton = <>
                                <button
                                    onClick={() => {
                                        deleteEvent(event)
                                        .then(() => {
                                            props.history.push("/")
                                        })
                                    }}
                                    >Delete event
                                </button>
                            </>
        eventEditButton = <>
                            <button onClick={() => {
                                props.history.push(`/editEvent/${event.id}`)
                                }}
                                >Edit event
                            </button>
                        </>
    }

    if (next === true) {
        eventSectionClass = "latestEvent"
    }

    return (
        <section className={eventSectionClass}>
            <div className="eventCardInfo">Name: {event.name}</div>
            <div className="eventCardInfo">Date: {event.date}</div>
            <div className="eventCardInfo">Location: {event.location}</div>
            {eventEditButton}
            {eventDeleteButton}
        </section>
    )
}