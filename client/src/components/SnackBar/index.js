import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import { connect } from "react-redux";

import "../../styles/Style.css";

class SnackBar extends Component {
  state = {
    infoMessage: {},
    errorMessage: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.alert.infoMessage) {
      this.setState({ infoMessage: nextProps.alert.infoMessage });
    }

    if (nextProps.alert.errorMessage) {
      this.setState({ errorMessage: nextProps.alert.errorMessage });
    }
  }

  render() {
    const { infoMessage, errorMessage } = this.state;

    let message;

    if (!_.isEmpty(infoMessage)) {
      message = (
        <div className="info-message message">
          <h3>Global Message</h3>
          <p>{infoMessage.msg}</p>
        </div>
      );
    }

    if (!_.isEmpty(errorMessage)) {
      message = (
        <div className="error-message message">
          <h3>Global Message</h3>
          <p>{errorMessage.error}</p>
        </div>
      );
    }

    return <Fragment>{message}</Fragment>;
  }
}

SnackBar.propTypes = {
  alert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(SnackBar);
