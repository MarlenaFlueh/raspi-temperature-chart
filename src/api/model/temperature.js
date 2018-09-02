const mongoose = require("mongoose");

const temperatureSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  temp: { type: Number, required: true },
  time: { type: Number }
});

module.exports = mongoose.model("Temperature", temperatureSchema);
