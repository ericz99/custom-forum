import React, { Fragment } from "react";

export default function Button({ children, onClick }) {
  return (
    <Fragment>
      <button onClick={onClick}>{children}</button>
    </Fragment>
  );
}
