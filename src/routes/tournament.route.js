const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Tournament = mongoose.model("tournament");

// reads
router.get("/", async (req, res) => {
  const tournaments = await Tournament.find({}).exec();
  res.status(200).json(tournaments);
});

router.get("/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id) == false) {
    res.status(200).json(null);
    return;
  }

  const tournament = await Tournament.findById(req.params.id).exec();
  res.status(201).send(tournament);
});

// saves
router.post("/", async (req, res) => {
  const createdTournament = await Tournament.create(req.body.tournament);
  res.status(200).send(createdTournament);
});

// updates
router.put("/:id", (req, res) => {
  res.status(203).send("update");
});

// deletes
router.delete("/:id", (req, res) => {
  res.status(205).send("delete");
});

module.exports = router;
