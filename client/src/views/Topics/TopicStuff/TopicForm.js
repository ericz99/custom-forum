import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTopic } from "../../../actions/topicActions";

import FormField from "../../../components/common/FormField";
import TextArea from "../../../components/common/TextArea";
import Select from "../../../components/common/Select";

import "../../../styles/Form.css";

class TopicForm extends Component {
  state = {
    name: "",
    desc: "",
    image: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

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

    await this.props.addTopic(formData);
    // then redirect user back
    this.props.history.goBack();
  };

  render() {
    const { name, desc, image, errors } = this.state;
    return (
      <div className="container">
        <form
          action=""
          className="topic-form"
          onSubmit={e => this.onSubmitHandler(e)}
        >
          <FormField
            type="text"
            name="name"
            placeholder="What would you like to name your community?"
            value={name}
            onChange={e => this.onChangeHandler(e)}
            errors={errors}
            label="Your community name!"
          />
          <TextArea
            type="text"
            name="desc"
            placeholder="Please give us a short description about your community!"
            value={desc}
            onChange={e => this.onChangeHandler(e)}
            errors={errors}
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
  errors: PropTypes.object.isRequired,
  addTopic: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addTopic }
)(TopicForm);
