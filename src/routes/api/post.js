const express = require("express");
const Router = express.Router();
const passport = require("passport");

const {
  testAPIRoute,
  createNewPostAPIRoute
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

module.exports = Router;
