import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { viewPost, likePost, unlikePost } from "../../actions/postActions";

import CommentForm from "./CommentStuff/CommentForm";
import CommentItem from "./CommentStuff/CommentItem";
import Emoji from "../../components/common/Emoji";

class Post extends Component {
  state = {
    toggleForm: false
  };

  async componentDidMount() {
    const pathname = this.props.location.pathname.split("/");
    await this.props.viewPost(pathname[3]);
  }

  onLikeHandler = async (e, id) => {
    e.preventDefault();

    await this.props.likePost(id);
  };

  onUnlikeHandler = async (e, id) => {
    e.preventDefault();

    await this.props.unlikePost(id);
  };

  onCommentHandler = e => {
    e.preventDefault();

    this.setState(prevState => ({
      toggleForm: !prevState.toggleForm
    }));
  };

  onDeleteCommentHandler = e => {
    e.preventDefault();
  };

  findUserLikes(likes) {
    if (likes !== undefined) {
      const { auth } = this.props;

      const findIndex = likes
        .map(val => val.user.toString())
        .indexOf(auth.user.id);

      if (findIndex === -1) {
        return false;
      }

      return true;
    }
  }

  findUserComments(comments) {
    if (comments !== undefined) {
      const { auth } = this.props;

      const findIndex = comments
        .map(val => val.user.toString())
        .indexOf(auth.user.id);

      if (findIndex === -1) {
        return false;
      }

      return true;
    }
  }

  render() {
    const { toggleForm } = this.state;
    const { post, isLoading } = this.props.post;

    let postContent;
    let commentContent;

    if (isLoading || post === null) {
      postContent = <h1>Loading...</h1>;
    } else {
      if (post !== null && !isLoading) {
        postContent = (
          <div className="feed">
            <div className="header">
              <h1>{post.title}</h1>
            </div>
            <div className="body">
              <p>{post.desc}</p>
            </div>
            <div className="footer">
              {post.likes && post.comments && (
                <Fragment>
                  {" "}
                  <span>likes: {post.likes.length}</span>
                  <span>comments: {post.comments.length}</span>
                </Fragment>
              )}
              <div className="btnGroup">
                <span
                  className="like-btn"
                  onClick={e => this.onLikeHandler(e, post._id)}
                >
                  <i
                    className={classnames("fa fa-thumbs-o-up", {
                      liked: this.findUserLikes(post.likes)
                    })}
                    aria-hidden="true"
                  />
                </span>
                <span
                  className="unlike-btn"
                  onClick={e => this.onUnlikeHandler(e, post._id)}
                >
                  <i className="fa fa-thumbs-o-down" aria-hidden="true" />
                </span>
                <span
                  className="comment-btn"
                  onClick={e => this.onCommentHandler(e)}
                >
                  <i className="fa fa-commenting-o" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        );
      }

      if (post.comments !== undefined) {
        commentContent =
          post.comments.length === 0 ? (
            <h1 className="comments">
              Empty <Emoji symbol="😥" label="Sad but Relieved Face" />
            </h1>
          ) : (
            <CommentItem comments={post.comments} postId={post._id} />
          );
      }
    }

    return (
      <div className="container">
        <div className="main-content">{postContent}</div>
        <div className="comment-section">
          <div className="heading">
            <h1>Comments</h1>
          </div>
          {commentContent}
          {toggleForm && <CommentForm />}
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  viewPost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { viewPost, likePost, unlikePost }
)(Post);
