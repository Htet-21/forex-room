const mongoose = require("mongoose");

const ChannelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isPrivate: { type: Boolean, default: false },
});

module.exports = mongoose.model("Channel", ChannelSchema);
