const express = require("express");
const UserRouter = express.Router();

const User = require("./UserModel.js");

// GET /users
// Should get all the users
UserRouter.get("/", (req, res) => {
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
  const { username, password, email } = req.body;
  const newUser = new User({ username, password, email });

  newUser
    .save()
    .then(user => {
      res.status(201).json({ user });
    })
    .catch(err => {
      res.status(500).json({ Error: "Unsuccessful Post" });
    });
});

// POST users/login
// Login with a registered user
UserRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Error finding user." });
    }
    if (!user) {
      return res.status(422).json({ error: "Invalid username." });
    }
    user.checkPassword(password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const userData = {
          id: user._id,
          username: user.username
        };
        res.json({ userData });
      } else {
        return res.status(422).json({ error: "Invalid password." });
      }
    });
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
  const { id } = req.params;
  const options = { new: true };

  User.findByIdAndUpdate(id, req.body, options)
    .then(user => {
      res.status(200).json({ user });
    })
    .catch(err => {
      res.status(500).json({ Error: err });
    });
});

module.exports = UserRouter;
