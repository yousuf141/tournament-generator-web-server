const ScheduleGenerators = require("../helpers/scheduleGenerators");

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const Schedule = mongoose.model("schedule");
const Tournament = mongoose.model("tournament");

// reads
router.get("/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id) == false) {
    res.status(200).json(null);
    return;
  }

  const tournament = await Tournament.findById(req.params.id).exec();
  if (tournament == null) {
    res.status(200).json(null);
    return;
  }

  const schedule = await Schedule.findOne(
    { tournament },
    "tournament matches"
  ).exec();
  if (schedule == null) {
    res.status(200).json(null);
    return;
  }

  res.status(200).json(schedule);
});

// saves
router.post("/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id) == false) {
    res.status(200).json(null);
    return;
  }

  const foundTournament = await Tournament.findById(req.params.id).exec();
  if (foundTournament == null) {
    res.status(400).send(null);
    return;
  }

  let matches = [];
  if (foundTournament.type == "single") {
    matches = ScheduleGenerators.singles(foundTournament.teamNames);
  } else {
    matches = ScheduleGenerators.roundRobin(foundTournament.teamNames);
  }

  const createdSchedule = await Schedule.create(
    new Schedule({
      tournament: foundTournament,
      matches,
    })
  );

  res.status(200).json(createdSchedule);
});

// deletes
// router.delete("/:id", (req, res) => {
//   res.status(205).send("delete");
// });

module.exports = router;
