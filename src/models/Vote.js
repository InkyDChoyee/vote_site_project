// models/Vote.js

const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  title: String,
  options: [{ name: String, count: { type: Number, default: 0 } }],
});

const Vote = mongoose.model("Vote", voteSchema);

module.exports = Vote;
