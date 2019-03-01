const express = require("express");
const Router = express.Router();
const passport = require("passport");

const {
  testAPIRoute,
  createNewPostAPIRoute,
  deletePostAPIRoute,
  viewPostAPIRoute,
  likePostAPIRoute,
  unlikePostAPIRoute
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
  "/:topicId/:postId/view",
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

module.exports = Router;
