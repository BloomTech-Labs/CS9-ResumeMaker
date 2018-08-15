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
            // * null param = errors
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
