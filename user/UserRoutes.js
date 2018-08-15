const express = require("express");
const UserRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./UserModel.js");

const authenticate = (req, res, next) => {
  let token = req.get("Authorization");
  if (token != undefined) token = token.replace("Bearer ", "");
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    console.log("Repelled Invader", token);
    return res.status(403).json({
      error: "You're not allowed in here!"
    });
  }
};

// GET /users
// Should get all the users
UserRouter.get("/", authenticate, (req, res) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ Error: "Unsuccessful" });
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
          Error:
            "This email is already in use. Please choose the forgot password option to reset your password."
        });
      } else {
        const newUser = new User(userData);
        newUser
          .save()
          .then(user => {
            const payload = {
              username: user.username,
              id: user._id
            };
            const token = jwt.sign(payload, process.env.SECRET);
            res.status(201).json({ user, token });
          })
          .catch(err => {
            res.status(500).json({
              Error: "There was an error in account creation, please try again."
            });
          });
      }
    })
    .catch(err => {
      return res.status(500).json({
        Error: "There was an error in account creation, please try again."
      });
    });
});

// POST users/login
// Login with a registered user
UserRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then(user => {
    if (!user) {
      return res.status(422).json({ error: "Invalid credentials." });
    }
    const verified = user.checkPassword(password);
    if (verified) {
      const payload = {
        username: user.username,
        id: user._id
      };
      const token = jwt.sign(payload, process.env.SECRET);
      res.json({ token });
    } else res.status(422).json({ error: "Invalid Credentials." });
  });
});

// DELETE users/:id
// Make sure to send confirmation email for deleting
UserRouter.delete("/:id", (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(user => {
      res.status(200).send("Successfully deleted.");
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// PUT users/:id
// Update user information
UserRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const options = {
    new: true
  };
  User.findByIdAndUpdate(id, changes, options)
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ errorMessage: "No user with that id could be found." });
      } else res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ errorMessage: "Could not update a user with that id." });
    });
});

module.exports = UserRouter;
