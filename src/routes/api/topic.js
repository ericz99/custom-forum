const express = require("express");
const Router = express.Router();
const passport = require("passport");

const {
  testAPIRoute,
  createTopicAPIRoute,
  fetchAllTopicAPIRoute,
  deleteTopicAPIRoute,
  subscribeAPIRoute,
  unsubscribeAPIRoute
} = require("../../controllers/topic");

// @route   GET api/users/text
// @desc    Tests users route
// @access  Public
Router.get("/test", testAPIRoute);
// @route   POST api/users/create-topic
// @desc    create topic route
// @access  Private
Router.post(
  "/create-topic",
  passport.authenticate("jwt", { session: false }),
  createTopicAPIRoute
);
// @route   GET api/users/fetch-all
// @desc    fetches all created topics
// @access  Private
Router.get(
  "/fetch-all",
  passport.authenticate("jwt", { session: false }),
  fetchAllTopicAPIRoute
);
// @route   DELETE api/users/delete/:id
// @desc    delete topic with specific id || only user created is permitted to delete the topic
// @access  Private
Router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  deleteTopicAPIRoute
);
// @route   GET api/users/topic/subscribe/:id
// @desc    subscribe to the topic by id
// @access  Private
Router.get(
  "/subscribe/:id",
  passport.authenticate("jwt", { session: false }),
  subscribeAPIRoute
);
// @route   GET api/users/topic/unsubscribe/:id
// @desc    unsubscribe to the topic by id
// @access  Private
Router.get(
  "/unsubscribe/:id",
  passport.authenticate("jwt", { session: false }),
  unsubscribeAPIRoute
);

module.exports = Router;
