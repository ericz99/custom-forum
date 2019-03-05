const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const secretKeys = require("../../_config/keys_dev").secretOrKey;
const mailer = require("../../misc/mailer");

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
  },
  // @route   GET api/users/change-password
  // @desc    change user password
  // @access  Private => required valid jwt token
  changePasswordAPIRoute: async (req, res, next) => {
    try {
      // we generated a random string
      const token = randomstring.generate();
      // save it to user database
      const date = new Date();
      await User.findByIdAndUpdate(
        { _id: req.user.id },
        {
          resetPasswordToken: token,
          resetPasswordTokenExpiry: date.setMinutes(date.getMinutes() + 30)
        },
        { upsert: true, new: true }
      ).exec();

      // send user the send user the same token to their email
      const html = `Hi there,
        <br/>
        Thank you for requesting a password reset!
        <br/><br/>
        Please click on this link to proceed on changing your password!
        <br/>
        TOKEN: <b>${token}<b/>
        <br/>
        On the following page:
        <a href="http://localhost:3000/reset-password">http://localhost:3000/reset-password</a>
        <br/><br/>
        Have a pleasant day!
      `;

      // send user email
      await mailer.sendEmail(
        "admin@support.com",
        req.user.email,
        "Password Reset",
        html
      );

      // send user response about "Successfully sent password change!"
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          msg: "Successfully sent password reset email!"
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
  // @route   POST api/users/:token/reset
  // @desc    change user password => must have valid token
  // @access  Private => required valid jwt token
  changeUserPasswordAPIRoute: async (req, res, next) => {
    try {
      // first get the token
      const { token } = req.params;
      const { newPassword } = req.body;

      if (newPassword === "") {
        return res.status(404).json({
          statusCode: 404,
          error: { reason: "Opps, looks like new password field blank!" },
          data: null
        });
      }
      // find if token exist
      const user = await User.findOne({
        resetPasswordToken: token
      }).exec();

      // if not then return error
      if (!user) {
        return res.status(404).json({
          statusCode: 404,
          error:
            "Opps, seems like your token had expired or your token just doesn't exist!",
          data: null
        });
      }

      // find if time is expired
      if (user.resetPasswordTokenExpiry <= new Date()) {
        // setting token + expiry = null because time expired
        user.resetPasswordToken = null;
        user.resetPasswordTokenExpiry = null;
        // update db
        await user.save();
        //send response
        return res.status(404).json({
          statusCode: 404,
          error: "Opps, seems like your token had expired!",
          data: null
        });
      }

      // update user old password with new password
      user.password = newPassword;
      user.resetPasswordToken = null;
      user.resetPasswordTokenExpiry = null;
      await user.save();
      // send user response
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          msg:
            "Successfully resetted password! Please relogin to take full effect!"
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
  // @route   GET api/users/change-email
  // @desc    change user email => to another new email
  // @access  Private => required valid jwt token
  changeEmailAPIRoute: async (req, res, next) => {
    try {
      // forward user an email saying they want to change email
      const html = `Hi there,
        <br/>
        Thank you for requesting a email change!
        <br/><br/>
        Please click on this link below to proceed on changing your email!
        <br/>
        On the following page:
        <a href="http://localhost:3000/change-email">http://localhost:3000/change-email</a>
        <br/><br/>
        Have a pleasant day!
        <br/>
        <strong>NOTE: </strong> if you did not request anything, please don't ignore this email. Thank you!
      `;

      // send email
      await mailer.sendEmail(
        "admin@support.com",
        req.user.email,
        "Email Change",
        html
      );

      // user response
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          msg:
            "Successfully sent email! Please click on the link to proceed the next step!"
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
  // @route   POST api/users/change-email
  // @desc    change user email => to another new email
  // @access  Private => required valid jwt token
  changeUserEmailAPIRoute: async (req, res, next) => {
    try {
      const { newEmail } = req.body;

      // find user
      const user = await User.findById({ _id: req.user.id });

      // check if any email already exist

      // just change user email - and save it
      user.email = newEmail;
      await user.save();

      // send user response
      return res.status(200).json({
        statusCode: 200,
        error: null,
        data: {
          msg: "Successfully changed email! Please relogin to take full effect!"
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
  }
};
