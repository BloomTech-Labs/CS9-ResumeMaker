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
    user: String,
    newemail: {
      type: String,
      required: false,
      unique: true,
      validate: [validateEmail, "Invalid email."]
    },
    oldemail: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmailConfirmation", EmailConfirmation);
