import React from "react";

/**
 *
 * value of each option => to the topic by id
 */

export default function Option({ value, name }) {
  return (
    <div className="input-group">
      <option value="select" disabled>
        Please select something?
      </option>
      <option value={value}>{name}</option>
    </div>
  );
}
