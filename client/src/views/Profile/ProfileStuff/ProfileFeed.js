import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost } from "../../../actions/postActions";

class ProfileFeed extends Component {
  onDeleteHandler = async (e, postId, topicId) => {
    e.preventDefault();

    // run dispatch action deletepost
    await this.props.deletePost(postId, topicId);
    // refresh user screen
    window.location.reload();
  };

  render() {
    const { profile } = this.props;
    let posts;

    if (profile.post) {
      posts = profile.post.map(post => (
        <div key={post._id}>
          <div className="feed">
            <span
              className="more-btn"
              onClick={e => this.onDeleteHandler(e, post._id, post.topic)}
            >
              <i className="fa fa-trash-o" />
            </span>
            <div className="header">
              <h1>{post.title}</h1>
            </div>
            <div className="body">
              <p>{post.desc}</p>
            </div>
            <div className="footer">
              <span>likes: {post.likes.length}</span>
              <span>comments: {post.comments.length}</span>
            </div>
          </div>
        </div>
      ));
    }

    return <Fragment>{posts}</Fragment>;
  }
}

ProfileFeed.propTypes = {
  deletePost: PropTypes.func.isRequired
};

export default connect(
  null,
  { deletePost }
)(ProfileFeed);
