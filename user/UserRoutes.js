const express = require("express");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const nodemailer = require("nodemailer");
const base64url = require("base64url");
const crypto = require("crypto");
let websiteName = "";
if (process.env.SITE_NAME) {
  websiteName = process.env.SITE_NAME;
} else websiteName = "easy-resume.com";
require("dotenv").config();

const User = require("./UserModel.js");
const EmailConfirmation = require("./EmailConfirmationModel.js");

// GET users/currentuser (TEST ROUTE --- WILL REMOVE)
// Route to find id, username and email of current user
UserRouter.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.user);
    res.status(200).json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
);

// GET users (TEST ROUTE --- WILL REMOVE)
// Should get all the users
UserRouter.get("/", (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "Get unsuccessful." });
    });
});

// POST users/register
// Register a new user
// Make sure to send confirmation email
UserRouter.post("/register", (req, res) => {
  const userData = req.body;
  User.findOne({ email: userData.email })
    .then(user => {
      if (user) {
        res.status(500).json({
          error:
            "This email is already in use. Please choose the forgot password option to reset your password."
        });
      } else {
        const newUser = new User(userData);
        newUser
          .save()
          .then(user => {
            const payload = {
              id: user._id,
              email: user.email
            };
            const token = jwt.sign(payload, process.env.SECRET, {
              expiresIn: 604800
            });

            // creates a hash
            const hash = crypto.createHash("sha256");
            // adds data to the hash
            hash.update(user.id + process.env.SECRET + token);

            // This creates a new email confirmation waiting to be fulfilled. Once it is accessed successfully it should be deleted and the user activated.
            const newEmailConfirmation = new EmailConfirmation({
              hash: base64url(hash.digest("hex")),
              user: user._id
            });
            newEmailConfirmation.save();
            // console.log("HASH IS ", newEmailConfirmation.hash);

            // This sends a test email that can set user.active to true, thus allowing them to use the sites functions.
            nodemailer.createTestAccount((err, account) => {
              // create reusable transporter object using the default SMTP transport
              let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: account.user, // generated ethereal user
                  pass: account.pass // generated ethereal password
                }
              });

              // console.log(req.get("host"));
              // console.log(req.baseUrl);
              let mailOptions = {
                from: `"Fredegar Fu 👻" <signup@${websiteName}>`,
                to: `${user.email}`,
                subject: `Confirm your registration to ${websiteName}!`,
                text: `Thank you for signing up! Please go to this address to confirm your registration: ${req.get(
                  "host"
                )}${req.baseUrl}/confirmemail/${newEmailConfirmation.hash}`,
                html: `Thank you for signing up! Please click this <a href=${req.get(
                  "host"
                )}${req.baseUrl}/confirmemail/${newEmailConfirmation.hash}
                }>link</a>.`
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);
                console.log(
                  "Preview URL: %s",
                  nodemailer.getTestMessageUrl(info)
                );
              });
            });

            res.status(201).json({ user, token });
          })
          .catch(err => {
            res.status(500).json({
              error: "There was an error in account creation, please try again."
            });
          });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "There was an error in account creation, please try again."
      });
    });
});

// POST users/login
// Login with a registered user
UserRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(422).json({ error: "Invalid credentials." });
      }
      const verified = user.checkPassword(password);
      if (verified) {
        const payload = {
          id: user._id,
          email: user.email
        };
        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: 604800
        });
        res.json({ token, user });
      } else return res.status(422).json({ error: "Invalid credentials." });
    })
    .catch(err => {
      res.status(500).json({ error: "Could not log in." });
    });
});

// DELETE users/:id
// Make sure to send confirmation email for deleting
UserRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;
    if (id === req.user.id) {
      User.findByIdAndRemove(id)
        .then(user => {
          res.status(200).send("Successfully deleted.");
        })
        .catch(err => {
          res.status(404).json(err);
        });
    } else {
      res.status(500).json({ error: "You do not have access to this user!" });
    }
  }
);

// PUT users/info/:id
// Update user information
UserRouter.put(
  "/info/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.user);
    const id = req.params.id;
    if (id === req.user.id) {
      delete req.body.username;
      delete req.body.password;
      delete req.body.email;
      delete req.body.active;
      const changes = req.body;

      const options = {
        new: true
        // runValidators: true
      };

      User.findByIdAndUpdate(id, changes, options)
        .then(user => {
          if (!user) {
            return res
              .status(404)
              .json({ error: "No user with that id could be found." });
          } else res.status(200).json(user);
        })
        .catch(err => {
          res.status(500).json({ error: "Could not update" });
        });
    } else {
      res.status(500).json({ error: "You do not have access to this user!" });
    }
  }
);

// PUT users/email/:id
// Update user email
UserRouter.get("/confirmemail/:hash", (req, res) => {
  const hash = req.params.hash;
  const changes = {
    active: true
  };
  const options = {
    new: true
  };

  EmailConfirmation.findOne({ hash: hash }).then(emailconfirmation => {
    if (emailconfirmation) {
      User.findOneAndUpdate(
        { _id: emailconfirmation.user, active: false },
        changes,
        options
      )
        .then(user => {
          res.status(200).json("You have successfully signed up!");
        })
        .catch(err => {
          res.status(500).json({
            error: "Your account has already been activated or does not exist."
          });
        });
    } else
      res.status(500).json({
        error: "Your account has already been activated or does not exist."
      });
  });
});

// PUT users/password/:id
// Update user password
UserRouter.put("/password/:id", (req, res) => {});

module.exports = UserRouter;
