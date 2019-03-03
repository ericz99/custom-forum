import React from "react";

import Emoji from "../../components/common/Emoji";

export default function TextArea({
  name,
  value,
  placeholder,
  clientErrors,
  onChange,
  label
}) {
  return (
    <div className="input-group">
      {label && (
        <div className="label">
          <span>
            {label} <Emoji symbol="🧐" label="Face With Monocle" />
          </span>
        </div>
      )}
      <textarea
        className={clientErrors ? "error" : ""}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {clientErrors && (
        <div className="invalid-feedback">{clientErrors[name]}</div>
      )}{" "}
    </div>
  );
}
