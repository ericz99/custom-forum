import React, { Component } from "react";
import { Link } from "react-router-dom";

import Emoji from "../../components/common/Emoji";

import "./Home.css";
import "../../styles/Global.css";

export default class Home extends Component {
  render() {
    return (
      <div className="content">
        <h1>Welcome to Custom Forum!</h1>
        <p>
          <small>
            aka reddit <Emoji symbol="😍" label="Smiling Face With Heart-Eye" />
          </small>
        </p>
        <ul className="menu">
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
