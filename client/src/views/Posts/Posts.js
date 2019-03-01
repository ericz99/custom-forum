import React, { Component, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { viewAllPost, resetPost } from "../../actions/postActions";
import { subscribeTopic, unsubscribeTopic } from "../../actions/topicActions";

import PostItem from "./PostStuff/PostItem";

/**
 * TODO: view all posts of a topic instead of view one topic and and view all posts
 */

class Posts extends Component {
  state = {
    post: {}
  };

  componentWillUnmount() {
    this.props.resetPost();
  }

  onSubscribeHandler = e => {
    e.preventDefault();

    this.props.subscribeTopic(this.props.match.params.id);
  };

  onUnsubscribeHandler = e => {
    e.preventDefault();

    this.props.unsubscribeTopic(this.props.match.params.id);
  };

  render() {
    // using our props
    const { topic, auth, isLoading } = this.props;

    // initialize variables
    let postContent;
    let topicDetail;
    let sub;

    // if loading
    if (isLoading) {
      postContent = <h1>Loading...</h1>;
    }
    // if not loading
    if (!isLoading && topic.post !== undefined) {
      postContent =
        topic.post.length === 0 || topic.post === null ? (
          <h1>Opps, there's currently no post available!</h1>
        ) : (
          <PostItem posts={topic.post} />
        );
    }

    // display topic detail
    if (topic.subscriber) {
      topicDetail = (
        <Fragment>
          <span>subscriber: {topic.subscriber.numberOfSubscriber} </span>
          <span>user: {topic.subscriber.users.length} </span>
        </Fragment>
      );
    }

    // show if user subscribe
    if (topic.subscriber) {
      const isMatch = topic.subscriber.users
        .map(val => val.user.toString())
        .indexOf(auth.user.id);

      sub =
        isMatch > -1 ? (
          <button type="button" onClick={e => this.onUnsubscribeHandler(e)}>
            unsubscribe
          </button>
        ) : (
          <button type="button" onClick={e => this.onSubscribeHandler(e)}>
            subscribe
          </button>
        );
    }

    return (
      <div className="container">
        <div className="main-content">
          <div className="left">{postContent}</div>
          <div className="right">
            <div className="user--options">
              <div className="title community">
                <p>community: {topic.name}</p>
              </div>
              <div className="details">{topicDetail}</div>
              <div className="btnGroup">
                <Link to={`/topics/${topic._id}/submit`}>create post</Link>
                {sub}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  topic: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  viewAllPost: PropTypes.func.isRequired,
  resetPost: PropTypes.func.isRequired,
  subscribeTopic: PropTypes.func.isRequired,
  unsubscribeTopic: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { viewAllPost, resetPost, subscribeTopic, unsubscribeTopic }
)(withRouter(Posts));
