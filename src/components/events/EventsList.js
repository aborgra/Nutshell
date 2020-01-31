import React, { useContext } from "react"
import { EventContext } from "./EventsProvider"
import { FriendContext } from "../friends/FriendProvider"
import Event from "./Event"
// import "./Events.css"

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
    console.log("sorted events")
    console.log(sortedEvents)

    return (
        <div className="events">
            <h1 className="events__header">Events</h1>
            <button className="addEvent" onClick={() => props.history.push("/createEvent")}>
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










// const events = useEvents();
// const friends = useFriends();

// let currentUserId = parseInt(sessionStorage.getItem("activeUser"), 10);

// const usersEvents = events.filter(event => event.userId === currentUserId);

// let friendsEvents = [];
// friends.map(friend => {
//     if (friend.friendInitiateId === currentUserId) {
//     events.filter(event => {
//         if (event.userId === friend.user.id) {
//         friendsEvents.push(event);
//         }
//     });
//     }
// });

// const combinedArray = usersEvents.concat(friendsEvents);

// combinedArray.sort(function(a, b) {
//     return new Date(a.date) - new Date(b.date);
// });
// let firstEvent = document.querySelector(".firstEvent");
// if (firstEvent != null) {
//     firstEvent.classList.remove(".firstEvent");
// }
// render(combinedArray);
// if (combinedArray.length > 0) {
//     let firstEventId = combinedArray[0].id;
//     let firstEventDialog = document.querySelector(
//     `#eventDetails--${firstEventId}`
//     );
//     let firstEventSection = firstEventDialog.closest(".eventCard");
//     firstEventSection.classList.add("firstEvent");
//     combinedArray.map(event => {
//     if (event.userId === parseInt(sessionStorage.getItem("activeUser"), 10)) {
//         let eventId = event.id;
//         let eventDialog = document.querySelector(`#eventDetails--${eventId}`);
//         let eventSection = eventDialog.closest(".eventCard");
//         if (eventSection.classList.contains("firstEvent") === false) {
//         eventSection.classList.add("friendPost");
//         }
//     }
//     });
//     EventEditRender(combinedArray);
//     EventDeleteRender(combinedArray);
// }
// renderForm();
// renderButton();
// };

// // Listens for click of Add Event button
// eventHub.addEventListener("click", clickEvent => {
// if (clickEvent.target.id === "addEventButton") {
//     const dialogTarget = document.querySelector(".eventDialog");
//     dialogTarget.showModal();
// }
// });

// // Listens for click of Save Event button
// eventHub.addEventListener("click", clickEvent => {
// if (clickEvent.target.id === "closeEventDialog") {
//     let formattedDate = new Date(
//     document.getElementById("eventDateTime").value
//     ).toString();

//     const newEvent = {
//     userId: parseInt(sessionStorage.getItem("activeUser"), 10),
//     name: document.getElementById("eventTitleText").value,
//     date: formattedDate,
//     location: document.getElementById("eventLocationText").value
//     };

//     const message = new CustomEvent("eventSaved", {
//     detail: {
//         wasEventSaved: "yes"
//     }
//     });

//     saveEvent(newEvent).then(() => {
//     eventHub.dispatchEvent(message);
//     });
// }
// });

// //Listens for click of Edit Event button
// eventHub.addEventListener("click", event => {
// if (event.target.id.startsWith("editEvent--")) {
//     const [prefix, id] = event.target.id.split("--");
//     const editEvent = new CustomEvent("editEventButtonClicked", {
//     detail: {
//         eventId: id
//     }
//     });
//     eventHub.dispatchEvent(editEvent);
// }
// });

// //Listens for click of Edit Event button
// eventHub.addEventListener("editEventButtonClicked", event => {
// const eventToEdit = event.detail.eventId;
// const allEvents = useEvents();
// const foundEvent = allEvents.find(currentEvent => {
//     return currentEvent.id === parseInt(eventToEdit, 10);
// });
// document.querySelector(`#eventName--${eventToEdit}`).value = foundEvent.name;
// document.querySelector(`#eventLocation--${eventToEdit}`).value =
//     foundEvent.location;
// const theDialog = document.querySelector(`#eventDetails--${foundEvent.id}`);
// theDialog.showModal();
// });

// // Listens for click of Save Edit button
// eventHub.addEventListener("click", clickEvent => {
// if (clickEvent.target.id.startsWith("saveEventEdit")) {
//     let currentUserId = parseInt(sessionStorage.getItem("activeUser"), 10);
//     const friends = useFriends();

//     const [prefix, eventId] = clickEvent.target.id.split("--");
//     let formattedDate = new Date(
//     document
//         .querySelector(`#eventDate--${eventId}`)
//         .textContent.split("Date: ")[1]
//     ).toString();
//     const editedEvent = {
//     id: parseInt(eventId, 10),
//     userId: parseInt(sessionStorage.getItem("activeUser"), 10),
//     name: document.querySelector(`#eventName--${eventId}`).value,
//     date: formattedDate,
//     location: document.querySelector(`#eventLocation--${eventId}`).value
//     };
//     editEvent(editedEvent).then(() => {
//     const updatedEvents = useEvents();
//     const updatedUsersEvents = updatedEvents.filter(
//         event => event.userId === currentUserId
//     );

//     let updatedFriendsEvents = [];
//     friends.map(friend => {
//         if (friend.friendInitiateId === currentUserId) {
//         updatedEvents.filter(event => {
//             if (event.userId === friend.user.id) {
//             updatedFriendsEvents.push(event);
//             }
//         });
//         }
//     });

//     const updatedCombinedArray = updatedUsersEvents.concat(
//         updatedFriendsEvents
//     );

//     updatedCombinedArray.sort(function(a, b) {
//         return new Date(a.date) - new Date(b.date);
//     });
//     let firstEvent = document.querySelector(".firstEvent");
//     if (firstEvent != null) {
//         firstEvent.classList.remove(".firstEvent");
//     }
//     render(updatedCombinedArray);
//     updatedCombinedArray.map(event => {
//         if (
//         event.userId === parseInt(sessionStorage.getItem("activeUser"), 10)
//         ) {
//         let eventId = event.id;
//         let eventDialog = document.querySelector(`#eventDetails--${eventId}`);
//         let eventSection = eventDialog.closest(".eventCard");
//         if (eventSection.classList.contains("firstEvent") === false) {
//             eventSection.classList.add("friendPost");
//         }
//         }
//     });
//     let firstEventId = updatedCombinedArray[0].id;
//     let firstEventDialog = document.querySelector(
//         `#eventDetails--${firstEventId}`
//     );
//     let firstEventSection = firstEventDialog.closest(".eventCard");
//     firstEventSection.classList.add("firstEvent");
//     EventEditRender(updatedCombinedArray);
//     EventDeleteRender(updatedCombinedArray);
//     renderForm();
//     });
// }
// });

// //Listens for click of Delete Event button
// eventHub.addEventListener("click", event => {
// if (event.target.id.startsWith("deleteEvent--")) {
//     let currentUserId = parseInt(sessionStorage.getItem("activeUser"), 10);
//     const friends = useFriends();

//     let [prefix, eventId] = event.target.id.split("--");
//     eventId = parseInt(eventId, 10);
//     deleteEvent(eventId).then(() => {

//     const updatedEvents = useEvents();
//     const updatedUsersEvents = updatedEvents.filter(
//         event => event.userId === currentUserId
//     );

//     let updatedFriendsEvents = [];
//     friends.map(friend => {
//         if (friend.friendInitiateId === currentUserId) {
//         updatedEvents.filter(event => {
//             if (event.userId === friend.user.id) {
//             updatedFriendsEvents.push(event);
//             }
//         });
//         }
//     });

//     const updatedCombinedArray = updatedUsersEvents.concat(
//         updatedFriendsEvents
//     );

//     updatedCombinedArray.sort(function(a, b) {
//         return new Date(a.date) - new Date(b.date);
//     });
//     let firstEvent = document.querySelector(".firstEvent");
//     if (firstEvent != null) {
//         firstEvent.classList.remove(".firstEvent");
//     }
//     render(updatedCombinedArray);
//     updatedCombinedArray.map(event => {
//         if (
//         event.userId === parseInt(sessionStorage.getItem("activeUser"), 10)
//         ) {
//         let eventId = event.id;
//         let eventDialog = document.querySelector(`#eventDetails--${eventId}`);
//         let eventSection = eventDialog.closest(".eventCard");
//         if (eventSection.classList.contains("firstEvent") === false) {
//             eventSection.classList.add("friendPost");
//         }
//         }
//     });
//     let firstEventId = updatedCombinedArray[0].id;
//     let firstEventDialog = document.querySelector(
//         `#eventDetails--${firstEventId}`
//     );
//     let firstEventSection = firstEventDialog.closest(".eventCard");
//     firstEventSection.classList.add("firstEvent");
//     EventEditRender(updatedCombinedArray);
//     EventDeleteRender(updatedCombinedArray);
//     renderForm();
//     });
// }
// });

// eventHub.addEventListener("click", event => {
// if (event.target.id.startsWith("xOutEventDialog")) {
//     const dialogTarget = document.querySelector(".eventDialog");
//     dialogTarget.close();
// }
// });

// eventHub.addEventListener("click", event => {
// if (event.target.id.startsWith("xOutEventEditDialog")) {
//     let [prefix, eventId] = event.target.id.split("--");
//     const dialogTarget = document.querySelector(`#eventDetails--${eventId}`);
//     dialogTarget.close();
// }
// });
