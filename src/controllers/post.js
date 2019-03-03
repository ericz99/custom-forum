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
          statusCode: 404,
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
      await topicMatch.post.unshift(userPost);

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
  // @route   GET api/post/:topicId/:postId
  // @desc    delete post route
  // @access  Private
  viewPostAPIRoute: async (req, res, next) => {
    try {
      const { postId } = req.params;

      // search for an given topic by id and postid => and one of them doesn't match then it will result in error
      const post = await Post.find({}).sort({
        date: -1
      });

      // find post match
      const postMatch = post.find(val => val._id == postId);

      // check if post exist or if topicid of the post doesn't match the current topic id section then return error
      if (!postMatch) {
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
      const findIndex = topicMatch.post
        .map(val => val.toString())
        .indexOf(postId);

      // check if user is already deleted
      if (findIndex === -1) {
        return res.status(404).json({
          statusCode: 404,
          error: "Post not found! User already deleted the post!"
        });
      }

      // then find the post id that matches the topics posts array => and splice it out
      await topicMatch.post.splice(findIndex, 1);

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
  // @route   GET api/post/:postId/like
  // @desc    like post route
  // @access  Private
  likePostAPIRoute: async (req, res, next) => {
    try {
      const { postId } = req.params;

      // find matching post
      const post = await Post.find({}).sort({ date: -1 });

      const postMatch = post.find(val => val._id == postId);

      // want to check if user already liked the post
      const findIndex = postMatch.likes
        .map(val => val.user.toString())
        .indexOf(req.user.id);

      // if user liked then execute this
      if (findIndex > -1) {
        return res.status(404).json({
          statusCode: 404,
          error: "Opps, looks like you already liked the post already!",
          data: null
        });
      }

      // push the user that liked the post into the like array
      await postMatch.likes.unshift({ user: req.user.id });

      // save to db
      await postMatch.save();

      // send user reponses
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          msg: "Successfully liked post!"
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
  // @route   GET api/post/:postId/unlike
  // @desc    like post route
  // @access  Private
  unlikePostAPIRoute: async (req, res, next) => {
    try {
      const { postId } = req.params;
      // find post
      const post = await Post.find({}).sort({ date: -1 });

      // find post like that matches user
      const postMatch = post.find(val => val._id == postId);

      // want to find the likes if user liked it already we can splice them out
      const findIndex = postMatch.likes
        .map(val => val.user.toString())
        .indexOf(req.user.id);

      // check user if they are not in the likes array => which means they already unliked the post
      if (findIndex === -1) {
        return res.status(404).json({
          statusCode: 404,
          error: "Opps, looks like user already unliked the post!",
          data: null
        });
      }

      // splice out the user from the array
      await postMatch.likes.splice(findIndex, 1);

      // save to db
      await postMatch.save();

      // send user response
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          msg: "Succesfully unliked post!"
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
  // @route   POST api/post/:postId/comment
  // @desc    comment post route
  // @access  Private
  commentPostAPIRoute: async (req, res, next) => {
    try {
      const { postId } = req.params;

      const { desc, image } = req.body;

      // validate form serverside
      if (desc === "") {
        return res.status(404).json({
          statusCode: 404,
          error: "Missing field required!",
          data: null
        });
      }

      const commentPost = {
        post: postId,
        user: req.user.id,
        desc,
        image
      };

      // find post
      const post = await Post.find({}).sort({ date: -1 });

      // find post like that post id
      const postMatch = post.find(val => val._id == postId);

      // // shift comment post in array
      await postMatch.comments.unshift(commentPost);

      // // save it to our db
      await postMatch.save();

      // send user response
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          msg: "Successfully comment post!"
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
  // @route   POST api/post/:postId/:commentId/delete
  // @desc    delete comment route
  // @access  Private
  deleteCommentPostAPIRoute: async (req, res, next) => {
    try {
      const { postId, commentId } = req.params;

      // find post
      const post = await Post.find({}).sort({ date: -1 });

      // find by postid
      const postMatch = post.find(val => val._id == postId);

      // find the comment of the post
      const findIndex = postMatch.comments
        .map(val => val._id.toString())
        .indexOf(commentId);

      // check if user is valid
      const findUserIndex = postMatch.comments.findIndex(
        val => val.user == req.user.id
      );

      // check if userIndex is found and greater than -1
      if (findUserIndex > -1) {
        // splice out comment from array
        await postMatch.comments.splice(findIndex, 1);

        // save it to our db
        await postMatch.save();

        // send user response
        return res.status(200).json({
          statusCode: 200,
          error: null,
          data: {
            msg: "Successfully deleted comment of the post!"
          }
        });
      }
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
