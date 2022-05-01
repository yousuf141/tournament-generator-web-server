// import random names
const randomGenNames = require("../helpers/randomNames");

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const RandomName = mongoose.model("randomName");

// reads
router.get("/", async (req, res) => {
  let randomNames = await RandomName.find({}).distinct("name").exec();
  if (randomNames.length === 0) {
    await refreshRandomNames();
    randomNames = await RandomName.find({}).distinct("name").exec();
  }
  randomNames = randomNames.slice(0, 32);
  randomNames = randomNames.sort(() => Math.random() - 0.5);

  res.status(200).json(randomNames);
});

// saves
router.post("/refresh", async (req, res) => {
  await refreshRandomNames();
  res.status(200).send();
});

async function refreshRandomNames() {
  await RandomName.deleteMany({}).exec();

  const randomNameDocs = randomGenNames.map(
    (x) =>
      new RandomName({
        name: x,
      })
  );
  await RandomName.bulkSave(randomNameDocs);
}

module.exports = router;
