import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { requestPasswordChange } from "../../actions/settingActions";

import Button from "../../components/common/Button";
import SnackBar from "../../components/SnackBar";

class Setting extends Component {
  onClickChangePassword = e => {
    if (e.target) {
      this.props.requestPasswordChange();
    }
  };

  onClickChangeEmail = e => {};

  render() {
    const { auth } = this.props;
    return (
      <div className="container">
        <div className="main-content">
          <div className="settings">
            <h2>
              <small>Settings</small>
            </h2>
            <div className="info">
              <p>USER: {auth.user.name}</p>
              <p>EMAIL: {auth.user.email}</p>
            </div>
            <div className="btnGroup">
              <Button onClick={e => this.onClickChangePassword(e)}>
                Change Password
              </Button>
              <Button>Change Email</Button>
            </div>
          </div>
        </div>
        <SnackBar />
      </div>
    );
  }
}

Setting.propTypes = {
  requestPasswordChange: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { requestPasswordChange }
)(Setting);
