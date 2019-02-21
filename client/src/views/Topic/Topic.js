import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/**
 * TODO: create a topic
 * TODO: display all topics => click on the topic and it will show all posts about that topic
 */

import "./Topic.css";

class Topic extends Component {
  render() {
    return (
      <div className="container">
        <div className="main-content">
          <div className="left">
            <h1>TOPIC SECTION</h1>
          </div>
          <div className="right">
            <h1>CREATING TOPIC/POSTS</h1>
          </div>
        </div>
      </div>
    );
  }
}

Topic.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
  // topic => posts
});

export default connect(mapStateToProps)(Topic);
