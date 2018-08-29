const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Resume = new Schema({
  user: {
    type: ObjectId,
    ref: "User"
  },
  links: {
    linkedin: {
      value: Boolean
    },
    github: {
      value: Boolean
    },
    portfolio: {
      value: Boolean
    }
  },
  sections: {
    experience: [
      {
        id: Number,
        value: Boolean
      }
    ],
    education: [
      {
        id: Number,
        value: Boolean
      }
    ],
    summary: [
      {
        id: Number,
        value: Boolean
      }
    ],
    skills: [
      {
        id: Number,
        value: Boolean
      }
    ]
  }
});

module.exports = mongoose.model("Resume", Resume);
