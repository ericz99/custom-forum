import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTopic } from "../../../actions/topicActions";

import InputField from "../../../components/common/InputField";
import TextArea from "../../../components/common/TextArea";
import { topicValidator } from "../../../utils/validate";

import "../../../styles/Form.css";

class TopicForm extends Component {
  state = {
    name: "",
    desc: "",
    image: "",
    clientErrors: []
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeImageHandler = e => {
    this.setState({ file: e.target.files[0] });
  };

  onSubmitHandler = async e => {
    e.preventDefault();

    const formData = {
      name: this.state.name,
      desc: this.state.desc,
      image: this.state.image
    };

    const errors = topicValidator(formData);

    // check if errors length is greater than 0
    if (errors.length > 0) {
      this.setState({ clientErrors: errors });
      return;
    }

    // clear errors
    this.setState({ clientErrors: [] });

    await this.props.addTopic(formData);
    // then redirect user back
    this.props.history.goBack();
  };

  render() {
    const { name, desc, image, clientErrors } = this.state;
    return (
      <div className="container">
        <form
          action=""
          className="topic-form form"
          onSubmit={e => this.onSubmitHandler(e)}
        >
          <InputField
            type="text"
            name="name"
            placeholder="What would you like to name your community?"
            value={name}
            onChange={e => this.onChangeHandler(e)}
            clientErrors={clientErrors.find(error => error.name)}
            label="Your community name!"
          />
          <TextArea
            type="text"
            name="desc"
            placeholder="Please give us a short description about your community!"
            value={desc}
            onChange={e => this.onChangeHandler(e)}
            clientErrors={clientErrors.find(error => error.desc)}
            label="Description about your community!"
          />
          <button type="submit">
            <span>Create</span>
          </button>
        </form>
      </div>
    );
  }
}

TopicForm.propTypes = {
  addTopic: PropTypes.func.isRequired
};

export default connect(
  null,
  { addTopic }
)(TopicForm);
