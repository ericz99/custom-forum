import React from "react";

import Emoji from "./Emoji";

export default function InputField({
  name,
  type,
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
      <input
        className={clientErrors ? "error" : ""}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {clientErrors && (
        <div className="invalid-feedback">{clientErrors[name]}</div>
      )}
    </div>
  );
}
