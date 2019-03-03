import React, { Fragment } from "react";

import CommentFeed from "./CommentFeed";

export default function CommentItem({ comments, postId }) {
  return (
    <Fragment>
      {comments.map(comment => (
        <CommentFeed comment={comment} key={comment._id} postId={postId} />
      ))}
    </Fragment>
  );
}
