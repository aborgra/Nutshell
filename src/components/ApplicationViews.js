import React from "react"
import { Route } from "react-router-dom"
import NewsForm from "./news/NewsForm"
import ProviderProvider from "./providers/ProviderProvider"
import FriendsList from "./friends/FriendsList"
import EventsList from "./events/EventsList"
import EventForm from "./events/EventForm"
import NewsList from "./news/NewsList"


export default (props) => {
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
            // <NewsList {...props} />
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
      <Route exact path="/createNews" render={
        props => <NewsForm {...props} />
      } />
      <Route  exact path="/editNews/:newsId(\d+)" render={
        props => <NewsForm {...props} />
      } />
    </ProviderProvider>
   
    </>
    
  )
}