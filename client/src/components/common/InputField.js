import React from "react";

export default function InputField({
  name,
  type,
  value,
  placeholder,
  clientErrors,
  onChange
}) {
  return (
    <div className="input-group">
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
