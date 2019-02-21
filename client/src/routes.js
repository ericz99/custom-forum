/***
 *  FILE: routes.js
 *  MODULE: This is our router for all our required routes
 */

import React from "react";
import { Route, Switch } from "react-router-dom";
import App from "./App";
import Home from "./views/Home/Home";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import Topic from "./views/Topic/Topic";
import jwt_decode from "jwt-decode";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";

// if user has token in localstorage already => just auth them
if (localStorage.jwtToken) {
  // set auth
  setAuthToken(localStorage.jwtToken);
  // get the decoded value from the token
  const decoded = jwt_decode(localStorage.jwtToken);
  // set current user to authentciated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());
    // redirect user back to login
    window.location.href = "/login";
  }
}

const Routes = () => {
  return (
    <App>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/topic" component={Topic} />
      </Switch>
    </App>
  );
};

export default Routes;
