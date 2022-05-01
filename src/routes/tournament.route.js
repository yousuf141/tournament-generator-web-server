const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Tournament = mongoose.model("tournament");

// reads
router.get("/", async (req, res) => {
  const tournaments = await Tournament.find({}).exec();
  res.status(200).json(tournaments);
});

router.get("/:id", (req, res) => {
  res.status(201).send("Get One");
});

// saves
router.post("/", async (req, res) => {
  await Tournament.create(req.body.tournament);
  res.status(200).send();
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
