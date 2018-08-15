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
    name: String,
    phoneNumber: {
      type: Number,
      min: 10
    }, 
    links: {
      linkedin: String,
      github: String,
      portfolio: String,
    },
    resume: {
      position: [{
        type: String
      }],
      summary: [{
        type: String
      }],
      education: [{
        type: String
      }],
      skills: [{
        type: String
      }]
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

User.methods.checkPassword = function(passwordGuess) {
  return bcrypt.compareSync(passwordGuess, this.password);
 };

module.exports = mongoose.model("User", User);
