import React from "react";

/**
 *
 * value of each option => to the topic by id
 */

export default function Select({ value, name }) {
  return (
    <div className="input-group">
      <select name="topic-list" id="topic-list">
        <option value="select" disabled>
          Please select something?
        </option>
        <option value={value}>{name}</option>
      </select>
    </div>
  );
}
