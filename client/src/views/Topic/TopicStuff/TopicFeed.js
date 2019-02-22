import React, { Component } from "react";

export default class TopicFeed extends Component {
  render() {
    const { topic } = this.props;
    return (
      <div className="topic-feed" key={topic._id}>
        <div className="topic-header">
          <h1>{topic.name}</h1>
        </div>
        <div className="topic-body">
          <p>{topic.desc}</p>
        </div>
        <div className="topic-footer">
          <span>subscriber: {topic.subscriber.numberOfSubscriber}</span>
          <span>posts: {topic.posts.length}</span>
        </div>
      </div>
    );
  }
}
