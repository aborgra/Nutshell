import React from "react";
import { Route } from "react-router-dom";
import ProviderProvider from "./providers/ProviderProvider";
import FriendsList from "./friends/FriendsList";
import MessagesList from "./messages/MessagesList";

export default () => {
  return (
    <>
      <ProviderProvider>
        <Route
          exact
          path="/"
          render={props => {
            return (
              <>
                <FriendsList {...props} />
                <MessagesList {...props} />
                {/* <EventsList {...props} />
            <NewsList {...props} />
            <TaskList {...props} /> */}
              </>
            );
          }}
        />
      </ProviderProvider>
    </>
  );
};
