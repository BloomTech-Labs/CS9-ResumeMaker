const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();
const secretKey = process.env.SECRET;

// Validation

/*
  Email example: test@service.com
*/
const validateEmail = email => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

/* 
  Password Requirements:
    Must be longer than 6 characters
    Must have at least 1 uppercase
    Must have at least 1 lowercase
    Must have at least 1 special character
    Must have at least 1 digit
*/
const checkPasswordStrength = password => {
  const minlength = 6;

  if (password.length < minlength) return false;
  if (!password.match(/[A-Z]/)) return false;
  if (!password.match(/[a-z]/)) return false;
  if (!password.match(/\d/)) return false;
  if (!password.match(/[`~!@#$%^&*\(\)_\-\+=\[{\]}\|\\:;"'<,>\.\?\/]/))
    return false;
  return true;
};

const EmailConfirmation = new mongoose.Schema(
  {
    // This is to see if the user has confirmed their email
    hash: {
      type: String,
      required: true
    },
    user: {
      type: String
    },
    newemail: {
      type: String,
      validate: [validateEmail, "Invalid email."]
    },
    oldemail: {
      type: String,
      validate: [validateEmail, "Invalid email."]
    },
    userData: {
      type: Object,
      username: {
        type: String,
        lowercase: true
      },
      password: {
        type: String,
        validate: [checkPasswordStrength, "Password Too Weak"]
      },
      email: {
        type: String,
        validate: [validateEmail, "Invalid Email"]
      }
    },
    createdAt: { type: Date, expires: 2400, default: Date.now }
  }
  // { timestamps: true }
);

EmailConfirmation.pre("save", function(next) {
  if (this.userData) {
    const cipher = crypto.createCipher("aes256", secretKey);
    let encrypted = cipher.update(this.userData.password, "utf8", "hex");
    encrypted += cipher.final("hex");
    this.userData.password = encrypted;
  }
  next();
});

module.exports = mongoose.model("EmailConfirmation", EmailConfirmation);
