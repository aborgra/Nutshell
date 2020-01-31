import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import ApplicationViews from "./ApplicationViews";
import NavBar from "./nav/NavBar";
import Login from "./auth/Login";
import Register from "./auth/Register";
import "./Nutshell.css";
import ProviderProvider from "./providers/ProviderProvider";
import { UserContext } from "./users/UserProvider";

export default () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("nutshell_user")) {
          return (
            <>
              <Route
                render={props => (
                  <ProviderProvider>
                    <NavBar {...props} />
                  </ProviderProvider>
                )}
              />
              <Route render={props => <ApplicationViews {...props} />} />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login" render={props => <Login {...props} />} />
    <Route path="/register" render={props => <Register {...props} />} />
  </>
);
