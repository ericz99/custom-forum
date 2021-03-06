import React, { Component } from "react";

import ToolBar from "../toolbar/ToolBar";

export default class Layout extends Component {
  render() {
    return (
      <div className="layout-content">
        <ToolBar />
        {this.props.children}
      </div>
    );
  }
}
