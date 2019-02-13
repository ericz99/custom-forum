import React, { Component } from "react";
import { reduxForm } from "redux-form";
import app from "../../base";

/**
 *
 * TODO: if user is logged in, push it to /dashboard
 * TODO: set up private routes
 * TODO: we should only hide private routes if user is authenticated
 *
 */

class Login extends Component {
  render() {
    return (
      <div>
        <h1>LOGIN</h1>
      </div>
    );
  }
}

// redux form
Login = reduxForm({
  form: "login"
})(Login);

export default Login;
