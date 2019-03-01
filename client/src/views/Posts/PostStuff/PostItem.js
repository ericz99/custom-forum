import React, { Fragment } from "react";

import PostFeed from "./PostFeed";

export default function PostItem({ posts }) {
  return (
    <Fragment>
      {posts.map(post => (
        <PostFeed post={post} key={post._id} />
      ))}
    </Fragment>
  );
}
