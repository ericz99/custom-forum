import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./ToolBar.css";
import "../../../styles/Global.css";

export default class ToolBar extends Component {
  /**
   *
   * IF USER IS ALREADY LOGGED IN, HE OR SHE CAN ACCESS OUR APP
   *
   *
   */
  render() {
    return (
      <div className="navbar">
        <ul className="menu">
          <li>
            <Link to="/">Custom Forum</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    );
  }
}
