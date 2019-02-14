const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 5000;

// init express app
const app = express();

const db = require("./_config/keys_dev").mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true }, err => {
  if (!err) {
    // body parser middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // passport middleware
    app.use(passport.initialize());
    require("./_config/passport")(passport);

    // api routes
    app.use("/api/users", require("./src/routes/api/users"));
    app.use("/api/topic", require("./src/routes/api/topic"));

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } else {
    console.log("error occured!", err);
  }
});
