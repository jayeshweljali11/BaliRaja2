const mongoose = require("mongoose");

const slidingPageSchema = new mongoose.Schema({
  content: { type: Number, required: true },
  scenes: { type: Number, default: 0 },
}, { strict: false, timestamps: true });

const SlidingPageModel = mongoose.model("SlidingPage", slidingPageSchema);
module.exports = SlidingPageModel;
