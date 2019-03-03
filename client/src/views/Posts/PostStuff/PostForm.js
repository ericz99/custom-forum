import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../../actions/postActions";

import InputField from "../../../components/common/InputField";
import TextArea from "../../../components/common/TextArea";
import { postValidator } from "../../../utils/validate";

import "../../../styles/Form.css";

class PostForm extends Component {
  state = {
    title: "",
    desc: "",
    image: "",
    clientErrors: []
  };

  onSubmitHandler = async e => {
    e.preventDefault();

    const formData = {
      title: this.state.title,
      desc: this.state.desc,
      image: this.state.image
    };

    const errors = postValidator(formData);

    // check if errors length is greater than 0
    if (errors.length > 0) {
      this.setState({ clientErrors: errors });
      return;
    }

    // clear errors
    this.setState({ clientErrors: [] });

    await this.props.addPost(formData, this.props.match.params.id);
    // then redirect user back
    this.props.history.goBack();
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { title, desc, image, clientErrors } = this.state;
    return (
      <div className="container">
        <form
          action=""
          className="post-form form"
          onSubmit={e => this.onSubmitHandler(e)}
        >
          <InputField
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={e => this.onChangeHandler(e)}
            clientErrors={clientErrors.find(error => error.title)}
            label="What is your title of your post?"
          />
          <TextArea
            type="text"
            name="desc"
            placeholder="Description"
            value={desc}
            onChange={e => this.onChangeHandler(e)}
            clientErrors={clientErrors.find(error => error.desc)}
            label="Description about your post!"
          />
          <button type="submit">
            <span>Post</span>
          </button>
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  post: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
