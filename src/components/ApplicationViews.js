import React from "react"
import { Route } from "react-router-dom"
import ProviderProvider from "./providers/ProviderProvider"
import FriendsList from "./friends/FriendsList"


export default () => {
  return (
    <>
    
    <ProviderProvider>
      <Route exact path="/" render={
        props => {
          return (
            // <MessageList {...props} />
            <FriendsList {...props} />
            // <EventsList {...props} />
            // <NewsList {...props} />
            // <TaskList {...props} />
          )}
        }/>
    </ProviderProvider>
   
    </>
    
  )
}