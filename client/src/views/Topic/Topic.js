import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { viewAllTopic } from "../../actions/topicActions";
import { Link } from "react-router-dom";

/**
 * TODO: create a topic
 * TODO: display all topics => click on the topic and it will show all posts about that topic
 */

import "./Topic.css";

import TopicItem from "./TopicStuff/TopicItem";

class Topic extends Component {
  componentDidMount() {
    this.props.viewAllTopic();
  }

  render() {
    const { isLoading, topics } = this.props.topic;
    let topicContent;

    if (topics === null || isLoading) {
      topicContent = <h1>Loading...</h1>;
    } else {
      topicContent =
        topics.length === 0 ? (
          <h1>No available topics! Please create one if you'd like!</h1>
        ) : (
          <TopicItem topics={topics} />
        );
    }

    return (
      <div className="container">
        <div className="main-content">
          <div className="left">{topicContent}</div>
          <div className="right">
            <p>
              Your personal Custom forum frontpage. Come here to check in with
              your favorite communities
            </p>
            <div className="btnGroup">
              <Link to="/create-post">create post</Link>
              <Link to="/create-topic">create community</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Topic.propTypes = {
  topic: PropTypes.object.isRequired,
  viewAllTopic: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  topic: state.topic
});

export default connect(
  mapStateToProps,
  { viewAllTopic }
)(Topic);
