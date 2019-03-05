const express = require("express");
const passport = require("passport");
const Router = express.Router();

const {
  testAPIRoute,
  registerAPIRoute,
  loginAPIRoute,
  currentUserAPIRoute,
  changeUserPasswordAPIRoute,
  changePasswordAPIRoute,
  changeEmailAPIRoute,
  changeUserEmailAPIRoute
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
// @route   GET api/users/change-password
// @desc    change user password
// @access  Private => required valid jwt token
Router.get(
  "/change-password",
  passport.authenticate("jwt", { session: false }),
  changePasswordAPIRoute
);
// @route   GET api/users/change-password/:token
// @desc    change user password => must have valid token
// @access  Private => required valid jwt token
Router.post(
  "/:token/reset",
  passport.authenticate("jwt", { session: false }),
  changeUserPasswordAPIRoute
);
// @route   GET api/users/change-email
// @desc    change user email => to another new email
// @access  Private => required valid jwt token
Router.get(
  "/change-email",
  passport.authenticate("jwt", { session: false }),
  changeEmailAPIRoute
);
// @route   POST api/users/change-email
// @desc    change user email => to another new email
// @access  Private => required valid jwt token
Router.post(
  "/change-email",
  passport.authenticate("jwt", { session: false }),
  changeUserEmailAPIRoute
);

module.exports = Router;
