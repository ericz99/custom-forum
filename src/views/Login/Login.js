import React, { Component } from "react";
import { reduxForm } from "redux-form";
import app from "../../base";

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
