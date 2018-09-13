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
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newResume = new Resume(req.body);
    const user = req.user;
    newResume.user = user._id;

    newResume
      .save()
      .then(resume => {
        // User.findById(user)
        //   .then(user => {
        //     // user.resumes = user.resumes.filter(userResume => userResume._id === resume._id);
        //     // user.resumes.push(resume);
        //     user.currentresume = resume._id;
        //     user.save();
        //     res.status(201).json({ Resume: resume, resumes: user.resumes });
        //   })
        //   .catch(err => {
        //     res.status(400).json({ Error: err });
        //   });
        res.status(201).json({ Resume: resume });
      })
      .catch(err => {
        res.status(400).json({ Error: err });
      });
  }
);

/*
  @route  resume/:id
  @desc   Edit a resume by id
  @access Private (Production) | Public (Development)
*/
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { id } = req.params;
    // if you put the _id in the update body errors will happen, so remove it and
    // also remove the unnecessary uploading of edit/creation date to keep correct edit times
    const updatedResume = req.body;

    Resume.findByIdAndUpdate(id, updatedResume)
      .then(resume => {
        res.status(200).json({ resume });
      })
      .catch(err => {
        res.status(400).json({ Error: err });
      });
  }
);

/*
  @route  resume/:id
  @desc   Delete a resume by id
  @access Private (Production) | Public (Development)
*/
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("req", req.body);
    const { id } = req.params;
    Resume.findById(id)
      .then(resume => {
        console.log("RESUME", resume.user)
        console.log("req.user", req.user.id)
        console.log(resume.user == req.user.id)
        // the following won't work if it has 3 equal signs!
        if (resume.user == req.user.id) {
          resume
            .remove()
            .then(resume => {
              console.log(resume);
              res.status(200).json({ message: "Resume successfully deleted." });
            })
            .catch(err => {
              console.log("ERROR", err)
              res.status(404).json({
                errorMessage: "Could not find and delete resume.",
                error: err
              });
            });
        } else {
          res
            .status(500)
            .json({ errorMessage: "You do not have access to this resume!" });
        }
      })
      .catch(err => {
        console.log("ERROR", err)
        res.status(404).json({
          errorMessage: "Could not find and delete resume.",
          error: err
        });
      });
  }
);

module.exports = router;
