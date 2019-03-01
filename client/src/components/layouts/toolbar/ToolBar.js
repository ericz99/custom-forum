import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../../actions/authActions";

import "./ToolBar.css";
import "../../../styles/Global.css";

class ToolBar extends Component {
  state = {
    showMenu: false
  };

  onClickHandler = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onShowHandler = e => {
    e.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  };

  closeMenu = e => {
    if (!this.dropdownMenu.contains(e.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let userRoute;

    if (isAuthenticated) {
      userRoute = (
        <ul className="menu">
          <li>
            <Link to="/topics">Custom Forum</Link>
          </li>
          <li>
            <p>
              Welcome <strong>{user.name}</strong>{" "}
            </p>
            <span onClick={e => this.onShowHandler(e)}>
              <i className="fa fa-ellipsis-v" />
            </span>
            {this.state.showMenu && (
              <div
                className="menu-list"
                ref={element => {
                  this.dropdownMenu = element;
                }}
              >
                <Link
                  to={`/user/${user.name
                    .split(" ")
                    .join("-")
                    .toLowerCase()}`}
                >
                  <i className="fa fa-user" />
                  My Profile
                </Link>
                <Link to="/settings">
                  <i className="fa fa-cogs" />
                  User Settings
                </Link>
                <Link to="/" onClick={e => this.onClickHandler(e)}>
                  <i className="fa fa-sign-out" />
                  Logout
                </Link>
              </div>
            )}
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

export default connect(
  mapStateToProps,
  { logoutUser }
)(ToolBar);
