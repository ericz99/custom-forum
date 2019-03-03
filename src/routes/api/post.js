const express = require("express");
const Router = express.Router();
const passport = require("passport");

const {
  testAPIRoute,
  createNewPostAPIRoute,
  deletePostAPIRoute,
  viewPostAPIRoute,
  likePostAPIRoute,
  unlikePostAPIRoute,
  commentPostAPIRoute,
  deleteCommentPostAPIRoute
} = require("../../controllers/post");

// @route   GET api/post/test
// @desc    Tests post route
// @access  Public
Router.get("/test", testAPIRoute);

// @route   POST api/post/topic/:id/create
// @desc    create new post route
// @access  Private
Router.post(
  "/topic/:id/create",
  passport.authenticate("jwt", { session: false }),
  createNewPostAPIRoute
);

// @route   GET api/post/topic/:id/delete
// @desc    delete post route
// @access  Private
Router.delete(
  "/topic/:topicId/delete/:postId",
  passport.authenticate("jwt", { session: false }),
  deletePostAPIRoute
);

// @route   GET api/post/:topicId/:postId/view
// @desc    view post route
// @access  Private
Router.get(
  "/:postId/view",
  passport.authenticate("jwt", { session: false }),
  viewPostAPIRoute
);

// @route   GET api/post/:postId/like
// @desc    like post route
// @access  Private
Router.get(
  "/:postId/like",
  passport.authenticate("jwt", { session: false }),
  likePostAPIRoute
);

// @route   GET api/post/:postId/unlike
// @desc    unlike post route
// @access  Private
Router.get(
  "/:postId/unlike",
  passport.authenticate("jwt", { session: false }),
  unlikePostAPIRoute
);

// @route   POST api/post/:postId/comment
// @desc    comment post route
// @access  Private
Router.post(
  "/:postId/comment",
  passport.authenticate("jwt", { session: false }),
  commentPostAPIRoute
);

// @route   POST api/post/:postId/:commentId/delete
// @desc    delete comment route
// @access  Private
Router.delete(
  "/:postId/:commentId/delete",
  passport.authenticate("jwt", { session: false }),
  deleteCommentPostAPIRoute
);

module.exports = Router;
