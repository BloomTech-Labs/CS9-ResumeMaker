const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const Resume = new Schema({
  user: {
    type: ObjectId,
    ref: "User"
  },
  email: String,
  name: {
    firstname: String,
    middlename: String,
    lastname: String
  },
  location: String,
  title: String,
  phonenumber: String,
  links: {
    linkedin: String,
    github: String,
    portfolio: String
  },
  sections: {
    experience: [
      {
        title: String,
        company: String,
        location: String,
        from: String,
        to: String
      }
    ],
    education: [
      {
        school: String,
        degree: String,
        fieldofstudy: String,
        from: String,
        to: String
      }
    ],
    summary: [
      {
        type: String
      }
    ],
    skills: [
      {
        type: String
      }
    ]
  }
});

module.exports = mongoose.model("Resume", Resume);
