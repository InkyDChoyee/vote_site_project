const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Vote = mongoose.model("vote", voteSchema);

module.exports = Vote;
