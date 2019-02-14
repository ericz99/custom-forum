const express = require("express");
const passport = require("passport");
const Router = express.Router();

const {
  testAPIRoute,
  registerAPIRoute,
  loginAPIRoute,
  currentUserAPIRoute
} = require("../../controllers/users");

// @route   GET api/users/text
// @desc    Tests users route
// @access  Public
Router.get("/test", testAPIRoute);
// @route   GET api/users/register
// @desc    register users route
// @access  Public
Router.post("/register", registerAPIRoute);
// @route   GET api/users/login
// @desc    login users route
// @access  Public
Router.post("/login", loginAPIRoute);
// @route   GET api/users/current
// @desc    current users route
// @access  Private => required valid jwt token
Router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  currentUserAPIRoute
);

module.exports = Router;
