import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class TopicFeed extends Component {
  render() {
    const { topic } = this.props;
    const name = topic.name.split(" ").join("-");

    return (
      <Link to={`/topics/${topic._id}`}>
        <div className="feed">
          <div className="header">
            <h1>{topic.name}</h1>
          </div>
          <div className="body">
            <p>{topic.desc}</p>
          </div>
          <div className="footer">
            <span>subscriber: {topic.subscriber.numberOfSubscriber}</span>
            <span>posts: {topic.post.length}</span>
          </div>
        </div>
      </Link>
    );
  }
}

export default TopicFeed;
