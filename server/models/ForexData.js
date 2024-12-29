const mongoose = require("mongoose");

const forexDataSchema = new mongoose.Schema({
  pair: { type: String, required: true },
  price: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Forex", forexDataSchema);
