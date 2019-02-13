import React, { Component } from "react";

import Layout from "./components/layouts/layout/Layout";

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Layout children={this.props.children} />
      </div>
    );
  }
}

export default App;
