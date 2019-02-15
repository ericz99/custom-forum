const Post = require("../models/Post");
const Topic = require("../models/Topic");

/**
 *
 * TODO: guest users can post as anynomous
 * TODO: delete post by id => also remove topic posts array -1
 * TODO: allow user to comment + like + report post
 * TODO: have userid + topicid of each post when created!
 */

module.exports = {
  // @route   GET api/post/test
  // @desc    Tests post route
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
  // @route   GET api/post/topic/:id/create
  // @desc    create new post route
  // @access  Private
  createNewPostAPIRoute: async (req, res, next) => {
    const { id } = req.params;
    const { title, desc, image } = req.body;

    if (title === "" || desc === "") {
      return res.status(400).json({
        statusCode: 400,
        error: "Opps, looks like your left some fields blank! Please try again!"
      });
    }

    const topic = await Topic.find({}).sort({ date: -1 });

    const topicMatch = topic.find(val => val._id == id);

    // find if topic id doesn't match
    if (!topicMatch) {
      return res.status(404).json({
        statusCode: 4040,
        error:
          "Opps, looks like the topic you tried to post is either deleted or have been removed from the main thread!"
      });
    }

    // create new post object
    const newPost = new Post({
      user: req.user.id,
      topic: topicMatch._id,
      title,
      desc,
      image,
      date: new Date().getTime()
    });

    // save new post in a variable
    const userPost = await newPost.save();

    // shift new post into topic
    await topicMatch.posts.unshift({ post: userPost });

    // save topic posts
    await topicMatch.save();

    // send user response
    return res.status(200).json({
      statusCode: 200,
      error: null,
      data: {
        msg: "Successfully created new post!",
        json: userPost
      }
    });
  },
  // @route   GET api/post/topic/:id/delete
  // @desc    delete post route
  // @access  Private
  deletePostAPIRoute: async (req, res, next) => {}
};
