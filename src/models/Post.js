const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: "topic"
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  upvote: {
    type: Number
  },
  downvote: {
    type: Number
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      },
      post: {
        type: Schema.Types.ObjectId
      },
      desc: {
        type: String,
        required: true
      },
      image: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
