const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre("save", async function(next) {
  const user = this;

  // we want to make sure if password field is modifed
  if (!user.isModified("password")) return next();

  // generate salt
  const salt = await bcrypt.genSalt(10);
  // generate hash pw
  const hashPassword = await bcrypt.hash(user.password, salt);
  // reassign hash passsword with plain text password
  user.password = hashPassword;
  user.confirmPassword = null;
  // call next middleware
  next();
});

module.exports = User = mongoose.model("users", UserSchema);
