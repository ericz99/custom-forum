import React from "react";

/**
 *
 * value of each option => to the topic by id
 */

export default function Select({ value, topicName, clientErrors, name }) {
  return (
    <div className="input-group">
      <select name="topic-list" id="topic-ist">
        <option value="select" disabled>
          Please select a topic you want to post!
        </option>
        <option value={value}>{topicName}</option>
      </select>
      {clientErrors && (
        <div className="invalid-feedback">{clientErrors[name]}</div>
      )}
    </div>
  );
}
