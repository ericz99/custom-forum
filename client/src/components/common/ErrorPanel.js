import React from "react";

import "../../styles/ErrorPanel.css";

export default function ErrorPanel({ error }) {
  return (
    <div className="error-panel">
      <div className="error-header">
        <h2>Form Error!</h2>
      </div>
      <div className="error-body">
        <h4>{error}</h4>
      </div>
    </div>
  );
}
