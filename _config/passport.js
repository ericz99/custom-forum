const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = require("../_config/keys_dev").secretOrKey;

// import user model
const User = require("../src/models/Users");

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findById(jwt_payload.id);

        if (!user) {
          done(null, false); // = unauthorized
        }

        // otherwise return the user
        done(null, user);
      } catch (err) {
        if (err) done(err, false);
      }
    })
  );
};
