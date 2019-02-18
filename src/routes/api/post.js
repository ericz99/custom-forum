const express = require("express");
const Router = express.Router();
const passport = require("passport");

const {
  testAPIRoute,
  createNewPostAPIRoute,
  deletePostAPIRoute
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

module.exports = Router;
