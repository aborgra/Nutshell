import React from "react"
import { Route } from "react-router-dom"
import NewsForm from "./news/NewsForm"
import ProviderProvider from "./providers/ProviderProvider"
import FriendsList from "./friends/FriendsList"
import NewsList from "./news/NewsList"


export default (props) => {
  return (
    <>
    
    <ProviderProvider>
        <Route exact path="/" render={
          props => {
            return(
              <>
              <NewsList {...props} />
              <FriendsList {...props} />
              </>
            )}} />
             <Route exact path="/createNews" render={
              props => <NewsForm {...props} />}
            />
             <Route  exact path="/editNews/:newsId(\d+)" render={
              props => <NewsForm {...props} />}
            />
    </ProviderProvider>
   
    </>
    
  )
}