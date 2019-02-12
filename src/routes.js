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

export default function routes() {
  return (
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </App>
  );
}
