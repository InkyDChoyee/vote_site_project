// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Vote = require("../src/models/vote");

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/vote_site")
  .then(() => {
    console.log("MongoDB에 연결");
  })
  .catch((error) => {
    console.error("MongoDB 연결 오류", error);
  });

app.get("/votes", async (req, res) => {
  try {
    const votes = await Vote.find(); // 모든 투표 항목 가져오기
    res.status(200).json(votes);
  } catch (error) {
    console.error("투표 목록 가져오기 실패: ", error);
    res
      .status(500)
      .json({ error: "투표 목록을 가져오는 중 오류가 발생했습니다" });
  }
});

app.get("/vote/:id", async (req, res) => {
  try {
    const votes = await Vote.findById(req.params.id);
    res.status(200).json(votes);
  } catch (error) {
    console.error("투표 불러오기 실패: ", error);
    res
      .status(500)
      .json({ error: "투표 목록을 가져오는 중 오류가 발생했습니다" });
  }
});

app.post("/vote", async (req, res) => {
  try {
    const { title, content: formattedContent } = req.body;
    const vote = new Vote({ title, content: formattedContent });
    // vote 저장
    await vote.save();
    console.log("저장 성공", vote);
    res.status(201).json({ message: "투표가 저장되었습니다" });
  } catch (error) {
    console.error("저장 실패", error);
    res.status(500).json({ error: "투표 저장 중 오류가 발생했습니다" });
  }
});

app.delete("/vote/:id", async (req, res) => {
  // :id 파라미터 추가
  try {
    const { id } = req.params;
    await Vote.findByIdAndDelete(id);
    console.log("삭제 성공");
    res.status(200).json({ message: "투표가 삭제되었습니다" });
  } catch (error) {
    console.error("삭제 실패", error);
    res
      .status(500)
      .json({ error: "투표 목록을 삭제하는 중 오류가 발생했습니다" });
  }
});

app.listen(5000, () => {
  console.log("서버가 5000 포트에서 실행 중입니다.");
});
