const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();

// Connect To mLab
mongoose
  .connect(
    process.env.MLABURL,
    { useNewUrlParser: true }
  )
  .then(() => console.log("\n... API Connected to Database ...\n"))
  .catch(err => console.log("\n*** ERROR Connecting to Database ***\n", err));

// Initialize Server
const server = express();

// Initialize passport authentication
server.use(passport.initialize());
require("./user/config_passport.js")(passport);

// Middleware
server.use(express.json());

const whitelist = ['https://labs-resume-maker.firebaseapp.com/'];
const corsOptions = {
  origin: function (origin, callback) {
    whitelist.indexOf(origin) !== -1 ? callback(null, true) : callback(new Error('Not allowed by CORS'))
  }
}
server.use(cors(corsOptions));

// Route for editing/adding/deleting users
const UserRouter = require("./user/UserRoutes.js");
server.use("/users", UserRouter);

// Initial GET route
server.get("/", (req, res) => {
  res.json({ Message: "Hello World" });
});

const port = process.env.PORT || 3333;
server.listen(port, () => console.log(`Server running on port: ${port}`));
