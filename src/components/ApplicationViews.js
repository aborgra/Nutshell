import React from "react"
import { Route } from "react-router-dom"
import NewsForm from "./news/NewsForm"
import ProviderProvider from "./providers/ProviderProvider"

export default () => {
  return (
    <>
    <ProviderProvider>
      <Route exact path="/" render={
        props => {
          return (
            <>
            {/* <MessageList {...props} />
            <FriendsList {...props} />
            <EventsList {...props} />
            <NewsList {...props} />
            <TaskList {...props} /> */}
            </>
          )}
        } />
        <Route path="/" render={
              props => <NewsForm {...props} />
            } />
    </ProviderProvider>
  
    </>
    
  )
}