const express = require("express");
const router = express.Router();
const passport = require("passport");

const Resume = require("./ResumeModel");
const User = require("../user/UserModel");

/*
    @route  resume
    @desc   Creates a new resume per user
    @access Private (Production) | Public (Development)
*/
router.post(
  "/",
  //   passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newResume = new Resume(req.body);
    const { email } = req.body;
    // const email = req.user.email;

    newResume
      .save()
      .then(resume => {
        User.findOneAndUpdate({ email })
          .then(user => {
            user.resumes.push(resume);
          })
          .catch(err => {
            res.status(400).json({ Error: err });
          });
        res.status(201).json({ Resume: resume });
      })
      .catch(err => {
        res.status(400).json({ Error: err });
      });
  }
);

module.exports = router;
