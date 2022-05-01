const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
  name: { type: String },
  type: { type: String },
  size: { type: Number },
  teamNames: [
    {
      type: String,
    },
  ],
});

mongoose.model("tournament", TournamentSchema);
