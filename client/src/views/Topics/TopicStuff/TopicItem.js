import React from "react";

import TopicFeed from "../TopicStuff/TopicFeed";

export default function TopicItem({ topics }) {
  return (
    <div>
      {topics.map(topic => (
        <TopicFeed topic={topic} key={topic._id} />
      ))}
    </div>
  );
}
