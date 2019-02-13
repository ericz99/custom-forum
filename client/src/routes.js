/***
 *  FILE: routes.js
 *  MODULE: This is our router for all our required routes
 */

import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import App from "./App";
import Home from "./views/Home/Home";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";

import PrivateRoute from "./components/common/PrivateRoute";

const Routes = ({ auth }) => {
  return (
    <App>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/register" render={() => <Register />} />
        <Route exact path="/login" render={() => <Login />} />
      </Switch>
      <Switch>
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </App>
  );
};

// const mapStateToProps = state => ({
//   auth: state.auth
// });

export default Routes;
