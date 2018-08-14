const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phonenumber: {
      type: String
    },
    name: {
      type: String
    },
    linkedin: {
      type: String
    },
    github: {
      type: String
    },
    portfolio: {
      type: String
    }
  },
  { timestamps: true }
);

User.pre("save", function(next) {
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// Simpler way to compare hashed passes but can't get this version to throw errors correctly
// User.methods.checkPassword = function(passwordGuess) {
//   return bcrypt.compare(passwordGuess, this.password);
// };

User.methods.checkPassword = function(plainTextPW, callBack) {
  bcrypt.compare(plainTextPW, this.password, (err, isMatch) => {
    if (err) return callBack(err);
    callBack(null, isMatch);
  });
};

module.exports = mongoose.model("User", User);
