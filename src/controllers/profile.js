const Profile = require("../models/Profile");
const Post = require("../models/Post");
const Topic = require("../models/Topic");
const User = require("../models/Users");

/**
 *
 * TODO: update postref => if user posted; same goes for making topic and saving posts
 */

module.exports = {
  // @route   GET api/profile/test
  // @desc    Tests profile route
  // @access  Public
  testAPIRoute: async (req, res, next) => {
    return res.status(200).json({
      statusCode: 200,
      errors: [],
      data: {
        msg: "OK, test route worked!"
      }
    });
  },
  // @route   GET api/profile/load
  // @desc    loads profile information of logged in user
  // @access  Private
  loadProfileAPIRoute: async (req, res, next) => {
    try {
      const post = await Post.find().sort({ date: -1 });

      // get only matched post
      const postMatch = post.filter(val => val.user.toString() == req.user.id);

      // get only matched comments
      const commentMatch = post
        .map(post => post.comments.map(comment => comment))
        .reduce((a, b) => [...a, ...b], [])
        .filter(comment => comment.user.toString() == req.user.id);

      const topic = await Topic.find();

      // get only matched topic
      const topicMatch = topic.filter(
        val => val.user.toString() == req.user.id
      );

      // populate stuff in this profile object
      const profile = await Profile.findOne({ "user.id": req.user.id })
        .populate("post")
        .populate("topic")
        .exec();

      // create a preload profile object
      const preloadProfile = new Profile({
        user: {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          date: req.user.date
        },
        post: postMatch,
        topic: topicMatch,
        comment: commentMatch
      });

      // save it to database
      const data = await preloadProfile.save();

      // send user response
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          msg: "Successfully configurated profile settings for user!",
          json: data
        }
      });
    } catch (error) {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          error: error
        });
      }
    }
  }
};
