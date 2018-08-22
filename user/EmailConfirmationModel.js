const mongoose = require("mongoose");

const validateEmail = newemail => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(newemail);
};

const EmailConfirmation = new mongoose.Schema(
  {
    // This is to see if the user has confirmed their email
    hash: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    newemail: {
      type: String,
      required: false,
      unique: true,
      validate: [validateEmail, "Invalid email."]
    },
    oldemail: {
      type: String,
      required: false,
      validate: [validateEmail, "Invalid email."]
    },
    createdAt: { type: Date, expires: 2400, default: Date.now }
  }
  // { timestamps: true }
);

module.exports = mongoose.model("EmailConfirmation", EmailConfirmation);
