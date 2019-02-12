import React, { Component, Fragment } from "react";

import Layout from "./components/layouts/layout/Layout";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Layout children={this.props.children} />
      </Fragment>
    );
  }
}

export default App;
