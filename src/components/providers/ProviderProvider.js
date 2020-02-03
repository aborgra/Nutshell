import React from "react";
import { MessageProvider } from "../messages/MessageProvider";
import { EventProvider } from "../events/EventsProvider";
import { FriendProvider } from "../friends/FriendProvider";
import { UserProvider } from "../users/UserProvider";
import { NewsProvider } from "../news/NewsProvider";
import { TasksProvider } from "../tasks/TaskProvider";

export default props => {

  
  return (
    <>
      <MessageProvider>
        <EventProvider>
          <FriendProvider>
            <NewsProvider>
              <TasksProvider>
                <UserProvider>{props.children}</UserProvider>
              </TasksProvider>
            </NewsProvider>
          </FriendProvider>
        </EventProvider>
      </MessageProvider>
    </>
  );
};
