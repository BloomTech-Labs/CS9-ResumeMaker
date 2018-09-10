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
    console.log("RESUME GET req:", req.body)

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
    console.log("RESUME POST req:", req.body)
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
    console.log("RESUME PUT req:", req.body)
    const { id } = req.params;
    const updatedResume = req.body;
    const user = req.user;
    updatedResume.user = user._id;

    Resume.findByIdAndUpdate(id, updatedResume)
      .then(resume => {
        // User.findById(user)
        //   .then(user => {
        //     user.resumes = user.resumes.filter(userResume => userResume._id === resume._id);
        //     user.currentresume = resume._id;
        //     user.save();
        //     res.status(200).json({ resume });
        //   })
        //   .catch(err => {
        //     res.status(400).json({ Error: err });
        //   });
        res.status(200).json({ resume });
      })
      .catch(err => {
        res.status(400).json({ Error: err });
      });
  }
);

module.exports = router;
