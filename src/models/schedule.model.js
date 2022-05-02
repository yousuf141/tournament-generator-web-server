const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  tournament: { type: mongoose.Schema.ObjectId, ref: "tournament" },
  matches: [
    {
      team_1: { type: String },
      team_2: { type: String },
    },
  ],
});

mongoose.model("schedule", ScheduleSchema);
