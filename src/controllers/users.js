const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretKeys = require("../../_config/keys_dev").secretOrKey;

// user model
const User = require("../models/Users");

module.exports = {
  // @route   GET api/users/text
  // @desc    Tests users route
  // @access  Public
  testAPIRoute: async (req, res, next) => {
    return res.status(200).json({
      statusCode: 200,
      error: null,
      data: {
        msg: "OK, test route worked!"
      }
    });
  },
  // @route   GET api/users/register
  // @desc    register users route
  // @access  Public
  registerAPIRoute: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        return res.status(400).json({
          statusCode: 400,
          errors: [{ reason: "Opps, looks like some field is left blank!" }]
        });
      }

      // find user if any email exist
      const user = await User.findOne({ email });

      if (user) {
        return res.status(404).json({
          statusCode: 404,
          error: "Email already existed in the database!"
        });
      }

      // create a new user
      const newUser = new User({
        name,
        email,
        password,
        confirmPassword,
        date: new Date().getTime()
      });

      // save user into our database
      await newUser.save();
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          type: "success",
          msg: "Successfully created account!"
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
  // @route   GET api/users/login
  // @desc    login users route
  // @access  Public
  loginAPIRoute: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (email === "" || password === "") {
        return res.status(404).json({
          statusCode: 404,
          error: "Opps, looks like some field is left blank!"
        });
      }

      // find user
      const user = await User.findOne({ email });

      // check only if user does not exist
      if (!user) {
        return res.status(404).json({
          statusCode: 404,
          error:
            "Opps, looks like email does not exist, please create one to continue!"
        });
      }

      // check if plain text password match
      const isMatch = await bcrypt.compare(password, user.password);

      // if password does not match
      if (!isMatch) {
        return res.status(404).json({
          statusCode: 404,
          error: "Password does match, please try again"
        });
      }

      // create payload for jwt to store any info
      const payload = { id: user.id, name: user.name, email: user.email };

      await JWT.sign(payload, secretKeys, { expiresIn: 3600 }, (err, token) => {
        if (!err) {
          return res.status(200).json({
            statusCode: 200,
            error: null,
            data: {
              token: "Bearer " + token
            }
          });
        } else {
          return res.status(404).json({
            statusCode: 404,
            error: err
          });
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
  // @route   GET api/users/current
  // @desc    current users route
  // @access  Private => required valid jwt token
  currentUserAPIRoute: async (req, res, next) => {
    if (res.statusCode !== 401) {
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          _id: req.user.id,
          name: req.user.name,
          email: req.user.email
        }
      });
    } else {
      return res.status(400).json({
        statusCode: 400,
        error: "Invalid access token"
      });
    }
  }
};
