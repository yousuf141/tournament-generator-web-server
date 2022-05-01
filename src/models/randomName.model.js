const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RandomNameSchema = new Schema({
  name: { type: String },
});

mongoose.model("randomName", RandomNameSchema);
