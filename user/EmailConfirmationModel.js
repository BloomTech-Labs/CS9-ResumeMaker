const mongoose = require("mongoose");

const EmailConfirmation = new mongoose.Schema(
  {
    // This is to see if the user has confirmed their email
    hash: {
      type: String,
      required: true
    },
    user: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmailConfirmation", EmailConfirmation);
