import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import store from "./store";

import "font-awesome/css/font-awesome.min.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
