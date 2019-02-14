const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    required: true
  },
  subscriber: {
    numberOfSubscriber: {
      type: Number
    },
    users: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users"
        }
      }
    ]
  },
  posts: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: "post"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Topic = mongoose.model("topic", TopicSchema);
