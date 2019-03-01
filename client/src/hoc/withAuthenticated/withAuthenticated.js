import React, { Component, Fragment } from "react";
import store from "../../store";
import { logoutUser } from "../../actions/authActions";

const withAuthenticated = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(undefined, err => {
        console.log(err);
        if (err.status === 401) {
          // if status is authorized or 401 when user decided to navigate to another view => boot them out
          store.dispatch(logoutUser());
          // store error in state
          this.setState({ error: err });
          // reject the err
          return Promise.reject(err);
        }
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    render() {
      return (
        <Fragment>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withAuthenticated;
