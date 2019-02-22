import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../actions/authActions";
import { loginValidator } from "../../utils/validate";

import InputField from "../../components/common/InputField";
import ErrorPanel from "../../components/common/ErrorPanel";

import "../../styles/Form.css";

/**
 *
 * TODO: if user is logged in, push it to /dashboard
 * TODO: set up private routes
 * TODO: we should only hide private routes if user is authenticated
 *
 */

class Login extends Component {
  state = {
    email: "",
    password: "",
    clientErrors: [],
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    // create user data
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    // do our validation here
    const errors = loginValidator(userData);

    // check if errors length is greater than 0
    if (errors.length > 0) {
      this.setState({ clientErrors: errors });
      return;
    }

    // clear errors
    this.setState({ clientErrors: [] });
    // submit our user credential
    this.props.loginUser(userData);
  };

  render() {
    const { errors, clientErrors } = this.state;

    return (
      <div>
        {errors.error == null ? "" : <ErrorPanel error={errors.error} />}
        <form onSubmit={e => this.onSubmitHandler(e)}>
          <InputField
            type="text"
            name="email"
            value={this.state.email}
            placeholder="Your email"
            onChange={e => this.onChangeHandler(e)}
            clientErrors={clientErrors.find(error => error.email)}
          />
          <InputField
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Your password"
            onChange={e => this.onChangeHandler(e)}
            clientErrors={clientErrors.find(error => error.password)}
          />

          <div className="right">
            <Link to="/register">Don't have an account?</Link>
          </div>
          <button type="submit">
            <span>Login</span>
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
