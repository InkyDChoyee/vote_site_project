// routes/vote.js

const express = require("express");
const router = express.Router();
const Vote = require("../models/Vote");

// 투표 생성 엔드포인트
router.post("/create", async (req, res) => {
  try {
    const { title, options } = req.body;
    const newVote = new Vote({
      title,
      options,
    });
    await newVote.save();
    res.json({
      success: true,
      message: "투표가 생성되었습니다.",
      vote: newVote,
    });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "투표 생성에 실패했습니다.",
        error: err.message,
      });
  }
});

module.exports = router;
