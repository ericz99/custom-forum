import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import setAuthToken from "../../../utils/setAuthToken";
import { setCurrentUser } from "../../../actions/authActions";
import store from "../../../store";

import "./ToolBar.css";
import "../../../styles/Global.css";

class ToolBar extends Component {
  onClickHandler = e => {
    if (e.target) {
      // remove token from localstorage
      localStorage.removeItem("jwtToken");
      // set auth false
      setAuthToken(false);
      // set current user as unauthenticated
      store.dispatch(setCurrentUser({}));
      // redirect user back to home page
      window.location.href = "/";
    }
  };

  render() {
    const { auth } = this.props;
    let userRoute;

    if (auth.isAuthenticated) {
      userRoute = (
        <ul className="menu">
          <li>
            <Link to="/topic">Custom Forum</Link>
          </li>
          <li>
            <Link to="/" onClick={e => this.onClickHandler(e)}>
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      userRoute = (
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
      );
    }

    return <div className="navbar">{userRoute}</div>;
  }
}

ToolBar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ToolBar);
