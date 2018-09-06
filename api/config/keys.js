require("dotenv").config();

module.exports = {
  uri: process.env.MLABURL,
  secret: process.env.SECRET,
  secret_key: process.env.SECRET_KEY,
  site_name: process.env.SITE_NAME
};
