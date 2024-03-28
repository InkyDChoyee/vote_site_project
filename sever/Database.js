// 1. 백엔드 서버
const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const Vote = require("./models/Vote");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/vote_site")
  .then(() => {
    console.log("MongoDB에 연결");
    app.listen(3001, () => {
      console.log("3001포트에서 서버 실행 중");
    });
  })
  .catch((error) => {
    console.error("MongoDB 연결 오류", error);
  });

// 2. API 엔드포인트
app.post("/api/votes", async (req, res) => {
  try {
    const { title, content } = req.body;
    const vote = new Vote({ title, content });
    await vote.save();
    res.status(201).json({ success: true, date: vote });
  } catch (error) {
    console.error("데이터 추가 오류", error);
    res.status(500).json({ success: false, error: "데이터 추가 오류" });
  }
});
