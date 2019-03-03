import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost, deleteCommentPost } from "../../../actions/postActions";

class ProfileFeed extends Component {
  onDeletePostHandler = async (e, postId, topicId) => {
    e.preventDefault();

    // run dispatch action deletepost
    await this.props.deletePost(postId, topicId);
    // refresh user screen
    window.location.reload();
  };

  onDeleteCommentHandler = async (e, postId, commentId) => {
    e.preventDefault();

    // run action
    await this.props.deleteCommentPost(postId, commentId);
    // refresh user screen
    window.location.reload();
  };

  render() {
    const { profile, value, auth } = this.props;
    let result;

    // only render if posts is selected
    if (value === "posts") {
      result =
        profile.post.length !== 0 ? (
          profile.post.map(post => (
            <div className="feed" key={post._id}>
              <span
                className="more-btn"
                onClick={e => this.onDeletePostHandler(e, post._id, post.topic)}
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
          ))
        ) : (
          <h1>No posts available</h1>
        );
    }

    if (value === "comments") {
      result =
        profile.comment.length !== 0 ? (
          profile.comment.map(comment => {
            if (comment.user === auth.user.id) {
              return (
                <div className="feed" key={comment._id}>
                  <span
                    className="more-btn"
                    onClick={e =>
                      this.onDeleteCommentHandler(e, comment.post, comment._id)
                    }
                  >
                    <i className="fa fa-trash-o" />
                  </span>
                  <div className="body">
                    <p>{comment.desc}</p>
                  </div>
                  <div className="footer">
                    <span>user: {comment.user}</span>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <h1>No comments available</h1>
        );
    }

    return <Fragment>{result}</Fragment>;
  }
}

ProfileFeed.propTypes = {
  deletePost: PropTypes.func.isRequired,
  deleteCommentPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, deleteCommentPost }
)(ProfileFeed);
