const express = require("express");
const Router = express.Router();
const passport = require("passport");

const {
  testAPIRoute,
  loadProfileAPIRoute
} = require("../../controllers/profile");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
Router.get("/test", testAPIRoute);

// @route   GET api/profile/load
// @desc    loads profile information of logged in user
// @access  Private
Router.get(
  "/load",
  passport.authenticate("jwt", { session: false }),
  loadProfileAPIRoute
);

module.exports = Router;
