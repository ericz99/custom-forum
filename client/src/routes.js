/***
 *  FILE: routes.js
 *  MODULE: This is our router for all our required routes
 */

import React from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";
import App from "./App";
import Home from "./views/Home/Home";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Topics from "./views/Topics/Topics";
import Topic from "./views/Topic/Topic";
import TopicForm from "./views/Topics/TopicStuff/TopicForm";
import PostForm from "./views/Posts/PostStuff/PostForm";
import Profile from "./views/Profile/Profile";
import Post from "./views/Post/Post";
import CreatePost from "./views/CreatePost";
import Setting from "./views/Setting";
import NotFound from "./views/NotFound";
import jwt_decode from "jwt-decode";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";

const UNAUTHORIZED = 401;

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

// this will intercept between request / reponses and see if anything happens if user token expired!
axios.interceptors.response.use(
  res => res,
  err => {
    const { status } = err.response;
    if (status === UNAUTHORIZED) {
      store.dispatch(logoutUser());
    }
    return Promise.reject(err);
  }
);

const Routes = () => {
  return (
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/topics" component={Topics} />
        <PrivateRoute exact path="/topics/:id" component={Topic} />
        <PrivateRoute exact path="/create-topic" component={TopicForm} />
        <PrivateRoute exact path="/topics/:id/submit" component={PostForm} />
        <PrivateRoute exact path="/user/:name" component={Profile} />
        <PrivateRoute
          exact
          path="/topics/:topicId/:postId/view"
          component={Post}
        />
        <PrivateRoute exact path="/submit" component={CreatePost} />
        <PrivateRoute exact path="/settings" component={Setting} />
        <Route component={NotFound} />
      </Switch>
    </App>
  );
};

export default Routes;
