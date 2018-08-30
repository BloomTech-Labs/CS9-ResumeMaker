const mongoose = require("mongoose");
const crypto = require("crypto");

const secretKey = require("../config/keys").secret;
const { validateEmail, checkPasswordStrength } = require("../helpers/Validation");

const EmailConfirmation = new mongoose.Schema({
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
  // The confirmation will auto delete after 1800 seconds (30 minutes)
  createdAt: { type: Date, expires: 1800, default: Date.now }
});

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
