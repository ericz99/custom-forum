import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class CreatePost extends Component {
  render() {
    const { topic } = this.props;

    console.log(this.props);
    return (
      <div>
        <h1>creating post...</h1>
      </div>
    );
  }
}

CreatePost.propTypes = {
  topic: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  topic: state.topic
});

export default connect(mapStateToProps)(CreatePost);
