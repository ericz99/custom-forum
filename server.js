const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 5000;

// init express app
const app = express();

const db = require("./config/keys").mongoURI;

mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true }, err => {
  if (!err) {
    // body parser middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // passport middleware
    app.use(passport.initialize());
    require("./config/passport")(passport);

    // api routes
    app.use("/api/users", require("./src/routes/api/users"));
    app.use("/api/topic", require("./src/routes/api/topic"));
    app.use("/api/post", require("./src/routes/api/post"));
    app.use("/api/profile", require("./src/routes/api/profile"));

    // server static assets if in production
    if (process.env.NODE_ENV === "production") {
      // set static folder
      app.use(express.static("client/build"));

      app.get("*", (req, res, next) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
      });
    }

    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } else {
    console.log("error occured!", err);
  }
});
