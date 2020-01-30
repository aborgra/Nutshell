import React from "react"
import { Route } from "react-router-dom"
import ProviderProvider from "./providers/ProviderProvider"
import FriendsList from "./friends/FriendsList"
import EventsList from "./events/EventsList"
import EventForm from "./events/EventForm"


export default () => {
  return (
    <>
    
    <ProviderProvider>
      <Route exact path="/" render={
        props => {
          return (
            <>
            {/* // <MessageList {...props} /> */}
            <FriendsList {...props} />
            <EventsList {...props} />
            {/* // <NewsList {...props} /> */}
            {/* // <TaskList {...props} /> */}
            </>
          )}
        }/>
      <Route exact path="/editEvent/:eventId(\d+)" render={
        props => <EventForm {...props} />
      } />
      <Route exact path="/createEvent" render={
        props => <EventForm {...props} />
      } />
    </ProviderProvider>
   
    </>
    
  )
}