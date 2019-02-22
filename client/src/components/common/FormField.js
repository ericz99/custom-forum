import React from "react";

import Emoji from "../../components/common/Emoji";

export default function FormField({
  name,
  type,
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
          {label} <Emoji symbol="😄" label="Grinning Face With Smiling Eyes" />
        </span>
      </div>
      <input
        className={errors.error ? "error" : ""}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {errors && <div className="invalid-feedback">{errors.error}</div>}
    </div>
  );
}
