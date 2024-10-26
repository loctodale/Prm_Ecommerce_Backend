// models/Device.js
const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deviceToken: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
