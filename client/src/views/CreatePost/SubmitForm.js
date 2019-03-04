import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";

import InputField from "../../components/common/InputField";
import TextArea from "../../components/common/TextArea";
import { postValidator } from "../../utils/validate";

import "../../styles/Form.css";

class SubmitForm extends Component {
  state = {
    title: "",
    desc: "",
    image: "",
    selected: "",
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

    await this.props.addPost(formData, this.state.selected);

    // then redirect user back
    this.props.history.push(`/topics/${this.state.selected}`);
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeSelected = e => {
    this.setState({ selected: e.target.value });
  };

  render() {
    const { title, desc, clientErrors } = this.state;
    let topicSelection;

    if (this.props.subscription) {
      topicSelection = this.props.subscription.subscriptions.map(topic => (
        <option value={topic._id} key={topic._id}>
          {topic.name}
        </option>
      ));
    }

    return (
      <div className="container">
        <form
          action=""
          className="post-form form"
          onSubmit={e => this.onSubmitHandler(e)}
        >
          {this.props.topicSelect === true ? (
            <select
              onChange={e => this.onChangeSelected(e)}
              value={this.state.selected}
            >
              <option value="" disabled hidden>
                Please select your default topic you want to post!
              </option>
              {topicSelection}
            </select>
          ) : null}
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

SubmitForm.propTypes = {
  // topic: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  topic: state.topic
});

export default connect(
  mapStateToProps,
  { addPost }
)(withRouter(SubmitForm));
