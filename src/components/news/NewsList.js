import React, { useContext } from 'react'
import News from './News'
import { NewsContext } from './NewsProvider'
import { FriendContext } from '../friends/FriendProvider'

export default (props) => {
  const { news } = useContext(NewsContext)
  const { friends} = useContext(FriendContext)
  
  let isFriend = false;

  const usersNews = news.filter(
    article =>
        article.userId === parseInt(localStorage.getItem("nutshell_user"))
)

  let friendsNews = []
    friends.map(friend => {
        if (friend.friendInitiateId === parseInt(localStorage.getItem("nutshell_user"))) {
            news.filter(
                article => {  
                    if (article.userId === friend.user.id) {
                        friendsNews.push(article)
                    }
                }
            )
        }
    })

    const combinedArray = usersNews.concat(friendsNews)



  return (
    <section>
       <button onClick={() => {
                props.history.push(`/createNews`)
            }}>Add News</button>
      {
        combinedArray.map(singleNews => {
          if (singleNews.userId != parseInt(localStorage.getItem("nutshell_user"))) {
            isFriend = true;

          }
            return (
                <News props={props} key={singleNews.id}
                      news={singleNews}
                      friendStatus={isFriend} />
            )
        })
      }
    </section>
  )
}
