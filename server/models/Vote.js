const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  {
    collection: "votes",
  }
);

const Vote = mongoose.model("vote", voteSchema);

module.exports = Vote;
