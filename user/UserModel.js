const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Validation
const validateEmail = email => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

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
      unique: true,
      validate: [validateEmail, "Invalid Email"]
    },
    name: String,
    phoneNumber: {
      type: Number,
      min: 10
    },
    links: {
      linkedin: String,
      github: String,
      portfolio: String
    },
    sections: {
      summary: [
        {
          type: String
        }
      ],
      experience: [
        {
          title: {
            type: String,
            required: true
          },
          company: {
            type: String,
            required: true
          },
          location: String,
          from: {
            type: String,
            required: true
          },
          to: String,
          description: String
        }
      ],
      education: [
        {
          school: {
            type: String,
            required: true
          },
          degree: {
            type: String,
            required: true
          },
          fieldofstudy: {
            type: String,
            required: true
          },
          from: {
            type: String,
            required: true
          },
          to: String,
          current: {
            type: Boolean,
            default: false
          }
        }
      ],
      skills: [
        {
          type: String
        }
      ]
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
