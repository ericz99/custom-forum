import React, { Component } from "react";
import { reduxForm } from "redux-form";
import app from "../../base";

import "./Register.css";

class Register extends Component {
  render() {
    return (
      <div className="content">
        <h1>REGISTER</h1>
      </div>
    );
  }
}

Register = reduxForm({
  form: "register"
})(Register);

export default Register;
