import React, { useContext, useState, useEffect, useRef } from "react"
import { EventContext } from "./EventsProvider"

export default props => {
    const { addEvent, events, editEvent } = useContext(EventContext)
    const [event, setEvent] = useState({})
    const eventName = useRef("")
    const eventDate = useRef("")
    const eventLocation = useRef("")

    const editMode = props.match.params.hasOwnProperty("eventId")

    const handleControlledInputChange = (e) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEvent = Object.assign({}, event)
        newEvent[e.target.name] = e.target.value
        setEvent(newEvent)
    }

    const setDefaults = () => {
        if (editMode) {
            const eventId = parseInt(props.match.params.eventId)
            const selectedEvent = events.find(e => e.id === eventId) || {}
            setEvent(selectedEvent)
        }
    }

    useEffect(() => {
        setDefaults()
    }, [events])

    const constructNewEvent = () => {
            if (editMode) {
                editEvent({
                    id: event.id,
                    userId: parseInt(localStorage.getItem("nutshell_user"), 10),
                    name: eventName.current.value,
                    date: eventDate.current.value,
                    location: eventLocation.current.value
                })
                    .then(() => props.history.push("/"))
            } else {
                addEvent({
                    id: event.id,
                    userId: parseInt(localStorage.getItem("nutshell_user"), 10),
                    name: eventName.current.value,
                    date: eventDate.current.value,
                    location: eventLocation.current.value
                })
                    .then(() => props.history.push("/"))
            }
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">{editMode ? "Edit event" : "Add event"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Event name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        ref={eventName}
                        proptype="varchar"
                        placeholder="Event name"
                        defaultValue={event.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Event date: </label>
                    <input type="datetime-local" name="date" required className="form-control"
                        ref={eventDate}
                        proptype="varchar"
                        defaultValue={event.date}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Event location: </label>
                    <input type="text" name="location" required autoFocus className="form-control"
                        ref={eventLocation}
                        proptype="varchar"
                        placeholder="Event location"
                        defaultValue={event.location}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewEvent()
                }}
                className="btn btn-primary">
                {editMode ? "Save Edit" : "Save New Event"}
            </button>
        </form>
    )
}