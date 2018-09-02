const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Temperature = require("../model/temperature");

router.get("/", (req, res, next) => {
  Temperature.find()
    .select("_id temp time")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        temperatures: docs
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  const temperature = new Temperature({
    _id: new mongoose.Types.ObjectId(),
    temp: req.body.temp,
    time: new Date().getHours()
  });
  temperature
    .save()
    .then(result => {
      res.status(200).json({
        message: "success created!",
        createdTemperatures: {
          _id: result._id,
          temp: result.temp,
          time: result.time
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
