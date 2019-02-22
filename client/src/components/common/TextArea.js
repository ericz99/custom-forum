import React from "react";

import Emoji from "../../components/common/Emoji";

export default function TextArea({
  name,
  value,
  placeholder,
  errors,
  onChange,
  label
}) {
  return (
    <div className="input-group">
      <div className="label">
        <span>
          {label} <Emoji symbol="🧐" label="Face With Monocle" />
        </span>
      </div>
      <textarea
        className={errors.error ? "error" : ""}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {errors && <div className="invalid-feedback">{errors.error}</div>}
    </div>
  );
}
