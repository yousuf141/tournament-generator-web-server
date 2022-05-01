// general imports
const fs = require("fs");
const join = require("path").join;
const config = require("./config");

// express
var express = require("express");
var cors = require("cors");
var app = express();

// mongoose
const mongoose = require("mongoose");

// import models
const models = join(__dirname, "./models");

require("./models/tournament.model");
require("./models/randomName.model");

// import routes
const tournamentRoute = require("./routes/tournament.route");
const randomNameRoute = require("./routes/randomName.route");

// set up mongodb
function connect() {
  mongoose.connection
    .on("error", console.log)
    .on("disconnected", connect)
    .once("open", listen);
  return mongoose.connect(config.db, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
connect();

// set up express app
app.use(cors());
app.use(express.json());

app.use("/tournament", tournamentRoute);
app.use("/random-name", randomNameRoute);

app.post("/", (req, res) => {
  setTimeout(() => {
    res.status(200).send();
  }, 1000);
});

function listen() {
  app.listen(3000, () => console.log(`Listening on port: ${3000}...`));
}
