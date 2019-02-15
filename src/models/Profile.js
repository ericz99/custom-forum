const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Object
  },
  postRef: [
    {
      post: {
        type: Schema.Types.ObjectId,
        ref: "post"
      }
    }
  ],
  topicRef: [
    {
      topic: {
        type: Schema.Types.ObjectId,
        ref: "topic"
      }
    }
  ],
  savePosts: [
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

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
