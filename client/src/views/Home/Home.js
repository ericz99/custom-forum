import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Emoji from "../../components/common/Emoji";

import "./Home.css";
import "../../styles/Global.css";

class Home extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/topics");
    }
  }

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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
