import React, { useContext } from "react"
import { EventContext } from "./EventsProvider"
import { FriendContext } from "../friends/FriendProvider"
import Event from "./Event"
import "./Events.css"

export default (props) => {
    const { events } = useContext(EventContext)
    const { friends } = useContext(FriendContext)
    const activeUserId = parseInt(localStorage.getItem("nutshell_user"), 10)

    const filteredFriends = friends.filter(friend => friend.friendInitiateId === activeUserId)

    let friendsIdsArray = []

    filteredFriends.forEach(friend => {
        friendsIdsArray.push(friend.userId)
    })

    const filteredEvents = events.filter(event => event.userId === activeUserId || friendsIdsArray.includes(event.userId))

    console.log("unsorted events")
    console.log(events)
    const sortedEvents = filteredEvents
    sortedEvents.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
      });

    return (
        <div className="events">
            <h2 className="events__header">Events</h2>
            <button className="btn btn-primary" onClick={() => props.history.push("/createEvent")}>
                Add Event
            </button>
            <article className="eventsList">

                {
                    sortedEvents.map(event => {

                        let friendEvent = false
                        let nextEvent = false

                        if (friendsIdsArray.includes(event.userId)) {
                            friendEvent = true
                        }

                        if (sortedEvents[0] === event) {
                            nextEvent = true
                        }

                        return <Event key={event.id} 
                                event={event} 
                                props={props}
                                friend={friendEvent}
                                next={nextEvent} />
                    })
                } 
            </article>
        </div>
    )
}