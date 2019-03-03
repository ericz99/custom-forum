import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { commentPost } from "../../../actions/postActions";

import { commentValidator } from "../../../utils/validate";
import TextArea from "../../../components/common/TextArea";

class CommentForm extends Component {
  state = {
    desc: "",
    image: "",
    clientErrors: []
  };

  onSubmitHandler = async e => {
    e.preventDefault();

    const pathname = this.props.location.pathname.split("/");

    const data = {
      desc: this.state.desc,
      image: this.state.image
    };

    const errors = commentValidator(data);

    // check if errors length is greater than 0
    if (errors.length > 0) {
      this.setState({ clientErrors: errors });
      return;
    }

    // clear errors
    this.setState({ clientErrors: [] });

    // perform action method
    await this.props.commentPost(pathname[3], data);

    // clear input field
    this.setState({
      desc: "",
      image: ""
    });
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { clientErrors } = this.state;
    return (
      <Fragment>
        <form onSubmit={e => this.onSubmitHandler(e)} className="comment-form">
          <TextArea
            type="text"
            name="desc"
            value={this.state.desc}
            placeholder="Please type your comments here!"
            onChange={e => this.onChangeHandler(e)}
            clientErrors={clientErrors.find(error => error.desc)}
          />
          <button type="submit">
            <span>Post</span>
          </button>
        </form>
      </Fragment>
    );
  }
}

CommentForm.propTypes = {
  commentPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { commentPost }
)(withRouter(CommentForm));
