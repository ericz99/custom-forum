const Post = require("../models/Post");
const Topic = require("../models/Topic");
const User = require("../models/Users");

/**
 *
 * TODO: guest users can post as anynomous
 * TODO: delete post by id => also remove topic posts array -1 - done
 * TODO: allow user to comment + like + report post
 * TODO: have userid + topicid of each post when created! - done
 * TODO: able to view the post of the topic section
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
    try {
      const { id } = req.params;
      const { title, desc, image } = req.body;

      if (title === "" || desc === "") {
        return res.status(400).json({
          statusCode: 400,
          error:
            "Opps, looks like your left some fields blank! Please try again!"
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
    } catch (error) {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          error: error
        });
      }
    }
  },
  // @route   GET api/post/topic/:topicId/:postId
  // @desc    delete post route
  // @access  Private
  viewPostAPIRoute: async (req, res, next) => {
    try {
      const { topicId, postId } = req.params;

      // search for an given topic by id and postid => and one of them doesn't match then it will result in error
      const post = await Post.find({}).sort({
        date: -1
      });

      // find post match
      const postMatch = post.find(val => val._id == postId);

      // check if post exist or if topicid of the post doesn't match the current topic id section then return error
      if (!postMatch || postMatch.topic.toString() !== topicId) {
        return res.status(500).json({
          statusCode: 500,
          error: "Opps, looks like url that you're going to doesn't exist!"
        });
      }

      // return user response
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          msg: "Successfully fetched post!",
          json: postMatch
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
  },
  // @route   GET api/post/topic/:topicId/delete/:postId
  // @desc    delete post route
  // @access  Private
  deletePostAPIRoute: async (req, res, next) => {
    try {
      const { topicId, postId } = req.params;

      const topic = await Topic.find({}).sort({ date: -1 });

      const topicMatch = topic.find(val => val._id == topicId);

      // find if topic id doesn't match
      if (!topicMatch) {
        return res.status(404).json({
          statusCode: 404,
          error:
            "Opps, looks like the topic you tried to post is either deleted or have been removed from the main thread!"
        });
      }

      // find all post
      const post = await Post.find({}).sort({ date: -1 });

      // find post if id matches postid
      const postMatch = post.find(val => val._id == postId);

      // if not postid matches then => return error
      if (!postMatch) {
        return res.status(404).json({
          statusCode: 404,
          error:
            "Opps, looks like the post you're trying to delete does not exist!"
        });
      }

      // find if user is not owner of the post
      if (postMatch.user.toString() !== req.user.id) {
        return res.status(404).json({
          statusCode: 404,
          error:
            "Opps, looks like you dont't have permission to delete this post!"
        });
      }

      // if exist then we want to remove the post
      await postMatch.remove();

      // find index of the post in topic array
      const findIndex = topicMatch.posts
        .map(val => val.post.toString())
        .indexOf(postId);

      // check if user is already deleted
      if (findIndex === -1) {
        return res.status(404).json({
          statusCode: 404,
          error: "Post not found! User already deleted the post!"
        });
      }
      // then find the post id that matches the topics posts array => and splice it out
      await topicMatch.posts.splice(findIndex, 1);

      // update topic match
      await topicMatch.save();

      // send user response
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          msg: "Successfully delete post!"
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
  },
  // @route   GET api/post/topic/:topicId/like/:postId
  // @desc    like post route
  // @access  Private
  likePostAPIRoute: async (req, res, next) => {
    try {
      const { topicId, postId } = req.params;

      // find matching topic

      // find matching post

      // evaluate if both does not match

      // pust the user that liked the post into the like array

      // send user reponses
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
