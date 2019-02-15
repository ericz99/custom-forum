const Profile = require("../models/Profile");
const Post = require("../models/Post");
const Topic = require("../models/Topic");
const User = require("../models/Users");

/**
 *
 * TODO: update postref => if user posted; same goes for making topic and saving posts
 */

module.exports = {
  // @route   GET api/profile/test
  // @desc    Tests profile route
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
  // @route   GET api/profile/load
  // @desc    loads profile information of logged in user
  // @access  Private
  loadProfileAPIRoute: async (req, res, next) => {
    const profile = await Profile.findOne({ "user.id": req.user.id });

    // if we already configured user settings => then just display it
    if (profile) {
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          msg: "Successfully loaded user data!",
          json: profile
        }
      });
    }

    // create a preload profile object
    const preloadProfile = new Profile({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        date: req.user.date
      }
    });

    // save it to database
    const data = await preloadProfile.save();

    // send user response
    return res.status(200).json({
      statusCode: 200,
      error: null,
      data: {
        msg: "Successfully configurated profile settings for user!",
        json: data
      }
    });
  }
};