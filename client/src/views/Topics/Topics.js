import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { viewAllTopic } from "../../actions/topicActions";
import { Link } from "react-router-dom";

/**
 * TODO: create a topic
 * TODO: display all topics => click on the topic and it will show all posts about that topic
 */

import "../../styles/Style.css";

import TopicItem from "./TopicStuff/TopicItem";

class Topics extends Component {
  async componentDidMount() {
    await this.props.viewAllTopic();
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
            <div className="user--options">
              <p>
                Your personal Custom forum frontpage. Come here to check in with
                your favorite communities
              </p>
              <div className="btnGroup">
                <Link to="/submit">create post</Link>
                <Link to="/create-topic" className="create-community">
                  create community
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Topics.propTypes = {
  topic: PropTypes.object.isRequired,
  viewAllTopic: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  topic: state.topic
});

export default connect(
  mapStateToProps,
  { viewAllTopic }
)(Topics);
