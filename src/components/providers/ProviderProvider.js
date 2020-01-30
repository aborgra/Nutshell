import { MessageProvider } from "../messages/MessageProvider"
import { EventProvider } from "../events/EventsProvider"
import { FriendProvider } from "../friends/FriendProvider"
import { UserProvider } from "../users/UserProvider"

export default (props) => {
  return (
    <>
      <MessageProvider>
        <EventProvider>
          <FriendProvider>
            <NewsProvider>
              <TasksProvider>
                <UserProvider>
                  {props.children}
                </UserProvider>
              </TasksProvider>
            </NewsProvider>
          </FriendProvider>
        </EventProvider>
      </MessageProvider>
    </>
  )
}