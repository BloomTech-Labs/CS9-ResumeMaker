const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Validation
const validateEmail = email => {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}

const validatePhone = number => {
  let re = /^([0-9]{3}-)([0-9]{3}-)([0-9]{4})$/g;
  return re.test(number);
}

const checkPasswordStrength = password => {
  const minlength = 6;

  if (password.length < minlength) return false;
  if (!password.match(/[A-Z]/)) return false;
  if (!password.match(/[a-z]/)) return false;
  if (!password.match(/\d/)) return false;
  if (!password.match(/[`~!@#$%^&*\(\)_\-\+=\[{\]}\|\\:;"'<,>\.\?\/]/)) return false;
  return true;
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
      firstname: String,
      middlename: String,
      lastname: String
    },
    phonenumber: {
      type: String,
      validate: [validatePhone, "Invalid Phone Number"]
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
