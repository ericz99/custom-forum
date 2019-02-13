import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import Validate from "../../utils/validate";
import InputField from "../../components/common/InputField";

import "./Register.css";

/**
 *
 * TODO: set error handling if user email already exist, error message should already say "Email is already in used!"
 */

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    clientErrors: [],
    errors: {}
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    const errors = Validate(newUser);

    // check if errors length is greater than 0
    if (errors.length > 0) {
      this.setState({ clientErrors: errors });
      return;
    }

    // clear errors
    this.setState({ clientErrors: [] });

    // submit form
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { clientErrors, errors } = this.state;

    // console.log(errors); this errors will say "Email is already in used!"
    return (
      <div>
        <form onSubmit={e => this.onSubmitHandler(e)}>
          <InputField
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Your full name"
            onChange={e => this.onChangeHandler(e)}
            clientErrors={clientErrors.find(error => error.name)}
          />
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
          <InputField
            type="password"
            name="confirmPassword"
            value={this.state.confirmPassword}
            placeholder="Your confirm password"
            onChange={e => this.onChangeHandler(e)}
            clientErrors={clientErrors.find(error => error.confirmPassword)}
          />
          <div className="right">
            <Link to="/login">Already got an account?</Link>
          </div>
          <button>
            <span>register</span>
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
