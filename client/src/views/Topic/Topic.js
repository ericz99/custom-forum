import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { viewTopic } from "../../actions/topicActions";

import Posts from "../Posts/Posts";

class Topic extends Component {
  async componentDidMount() {
    await this.props.viewTopic(this.props.match.params.id);
  }

  render() {
    const { topic, isLoading } = this.props.topic;

    return (
      <Fragment>
        <Posts topic={topic} isLoading={isLoading} />
      </Fragment>
    );
  }
}

Topic.propTypes = {
  viewTopic: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  topic: state.topic
});

export default connect(
  mapStateToProps,
  { viewTopic }
)(Topic);
