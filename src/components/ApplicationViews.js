import React from "react"
import { Route } from "react-router-dom"
import NewsForm from "./news/NewsForm"
import ProviderProvider from "./providers/ProviderProvider"
import ProviderProvider from "./providers/ProviderProvider"
import FriendsList from "./friends/FriendsList"


export default () => {
  return (
    <>
    
    <ProviderProvider>
      <Route exact path="/" render={
        props => {
          return (
            <>
            {/* <MessageList {...props} />
            <EventsList {...props} />
            <NewsList {...props} />
          <TaskList {...props} /> */}
            </>
          )}
        } />
        <Route path="/" render={
          props => {
            return(
              <>
              <NewsForm {...props} />
              <FriendsList {...props} />
              </>
            )}} />
    </ProviderProvider>
   
    </>
    
  )
}