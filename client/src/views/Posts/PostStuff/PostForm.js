import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../../actions/postActions";

import FormField from "../../../components/common/FormField";
import TextArea from "../../../components/common/TextArea";
import Select from "../../../components/common/Select";

import "../../../styles/Form.css";

class PostForm extends Component {
  state = {
    title: "",
    desc: "",
    image: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmitHandler = async e => {
    e.preventDefault();

    const formData = {
      title: this.state.title,
      desc: this.state.desc,
      image: this.state.image
    };

    await this.props.addPost(formData, this.props.match.params.id);
    // then redirect user back
    this.props.history.goBack();
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { title, desc, image, errors } = this.state;
    return (
      <div className="container">
        <form
          action=""
          className="post-form"
          onSubmit={e => this.onSubmitHandler(e)}
        >
          <FormField
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={e => this.onChangeHandler(e)}
            errors={errors}
            label="What is your title of your post?"
          />
          <TextArea
            type="text"
            name="desc"
            placeholder="Description"
            value={desc}
            onChange={e => this.onChangeHandler(e)}
            errors={errors}
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
