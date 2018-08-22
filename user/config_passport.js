// https://github.com/themikenicholson/passport-jwt
const JwtStrategy = require("passport-jwt").Strategy;
// * Extract = extracts the user data from the given payload
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("./UserModel.js");
require("dotenv").config();
const options = {
  usernameField: "email",
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
};

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            // The following if ensures that the token being checked was made with the same password as the current user password.
            // So any tokens made before the user got their current pass will be invalid.
            // Possibly add the email in here too to invalidate tokens made before an email change?
            if (
              user.active === true &&
              jwt_payload.password === user.password &&
              jwt_payload.email === user.email
            ) {
              // * null param = errors
              return done(null, user);
            }
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
