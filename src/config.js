require("dotenv").config();

module.exports = {
  db: process.env.MONGODB_URL,
};
