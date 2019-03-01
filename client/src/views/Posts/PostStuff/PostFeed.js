import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class PostFeed extends Component {
  render() {
    const { post, location } = this.props;

    return (
      <Link to={`${location.pathname}/${post._id}`}>
        <div className="feed">
          <div className="header">
            <h1>{post.title}</h1>
          </div>
          <div className="body">
            <p>{post.desc}</p>
          </div>
          <div className="footer">
            <span>topic id: {post.topic}</span>
          </div>
        </div>
      </Link>
    );
  }
}

export default withRouter(PostFeed);
