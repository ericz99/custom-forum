import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { deleteCommentPost } from "../../../actions/postActions";
import PropTypes from "prop-types";

class CommentFeed extends Component {
  onDeleteHandler = async (e, postId, commentId) => {
    e.preventDefault();

    await this.props.deleteCommentPost(postId, commentId);
  };
  render() {
    const { comment, auth, postId } = this.props;
    return (
      <Fragment>
        <div className="feed">
          {comment.user === auth.user.id && (
            <span
              className="more-btn"
              onClick={e => this.onDeleteHandler(e, postId, comment._id)}
            >
              <i className="fa fa-trash-o" />
            </span>
          )}
          <div className="body">
            <p>{comment.desc}</p>
          </div>
          <div className="footer">
            <span>user id: {comment.user}</span>
          </div>
        </div>
      </Fragment>
    );
  }
}

CommentFeed.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteCommentPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteCommentPost }
)(CommentFeed);
