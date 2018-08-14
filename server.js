const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const server = express();

const port = process.env.PORT || 3333;
server.listen(port, () => console.log(`Server running on port: ${port}`))
