const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ObjectId = mongoose.Schema.Types.ObjectId;
const { checkPasswordStrength, validateEmail, validatePhone, validateLinkedIn, validateGithub } = require("../validation/Validation");

const User = new mongoose.Schema(
  {
    // This is to see if the user has confirmed their email
    active: {
      type: Boolean,
      required: true,
      default: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      validate: [checkPasswordStrength, "Password Too Weak"]
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, "Invalid Email"]
    },
    name: {
      firstname: {
        type: String,
        maxlength: 20
      },
      middlename: {
        type: String,
        maxlength: 20
      },
      lastname: {
        type: String,
        maxlength: 20
      }
    },
    location: String,
    title: String,
    phonenumber: {
      type: String,
      validate: [validatePhone, "Invalid Phone Number"]
    },
    links: {
      linkedin: {
        type: String,
        validate: [validateLinkedIn, "Invalid Linkedin"]
      },
      github: {
        type: String,
        validate: [validateGithub, "Invalid GitHub"]
      },
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
          to: String
        }
      ],
      skills: [
        {
          type: String
        }
      ]
    },
    membership: {
      type: Boolean,
      default: false
    },
    subscription: String,
    resumes: [{
      type: ObjectId,
      ref: "Resume"
    }]
  },
  { timestamps: true }
);

User.pre("save", function(next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 11, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

User.methods.checkPassword = function(passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

module.exports = mongoose.model("User", User);