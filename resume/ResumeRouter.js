const express = require("express");
const router = express.Router();
const passport = require("passport");

const Resume = require("./ResumeModel");
const User = require("../user/UserModel");

/*
    @route  resume/:id
    @desc   Gets a resume by its id
    @access Private (Production) | Public (Development)
*/
router.get(
  "/:id",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.params;

    Resume.findById(id)
      .then(resume => {
        res.status(200).json(resume);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

/*
    @route  resume
    @desc   Creates a new resume per user
    @access Private (Production) | Public (Development)
*/
router.post(
  "/",
    // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newResume = new Resume(req.body);
    const { user } = req.body;
    // const email = req.user.email;

    newResume
      .save()
      .then(resume => {
        User.findById(user)
          .then(user => {
            user.resumes.push(resume);
            user.save();
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
