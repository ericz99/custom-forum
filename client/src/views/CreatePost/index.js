import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchUserSubscriptions } from "../../actions/topicActions";
import SubmitForm from "./SubmitForm";

class CreatePost extends Component {
  async componentDidMount() {
    await this.props.fetchUserSubscriptions();
  }

  render() {
    const { subscription } = this.props;

    return (
      <Fragment>
        <SubmitForm topicSelect={true} subscription={subscription} />
      </Fragment>
    );
  }
}

CreatePost.propTypes = {
  fetchUserSubscriptions: PropTypes.func.isRequired,
  subscription: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  subscription: state.subscription
});

export default connect(
  mapStateToProps,
  { fetchUserSubscriptions }
)(CreatePost);
