const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Object
  },
  post: [
    {
      type: Schema.Types.ObjectId,
      ref: "post"
    }
  ],
  topic: [
    {
      type: Schema.Types.ObjectId,
      ref: "topic"
    }
  ],
  comment: [
    {
      type: Object
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
