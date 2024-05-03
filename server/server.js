// server.js
require('dotenv').config(); // dotenv 로드

const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Vote = require('../src/models/vote');
const User = require('../src/models/user');
const config = require('../config/config');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://43.202.6.49:8000', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const uri = config.mongoURI;
// const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB에 연결되었습니다.');
  })
  .catch((error) => {
    console.log(uri);
    console.error('MongoDB 연결 오류:', error);
  });

app.get('/votes', async (req, res) => {
  try {
    const votes = await Vote.find(); // 모든 투표 항목 가져오기
    res.status(200).json(votes);
  } catch (error) {
    console.error('투표 목록 가져오기 실패: ', error);
    res
      .status(500)
      .json({ error: '투표 목록을 가져오는 중 오류가 발생했습니다' });
  }
});

app.get('/vote/:id', async (req, res) => {
  try {
    const vote = await Vote.findById(req.params.id);
    res.status(200).json(vote);
  } catch (error) {
    console.error('투표 불러오기 실패: ', error);
    res
      .status(500)
      .json({ error: '투표 목록을 가져오는 중 오류가 발생했습니다' });
  }
});

app.post('/vote', async (req, res) => {
  try {
    const { title, content: formattedContent } = req.body;
    const vote = new Vote({ title, content: formattedContent });
    // vote 저장
    await vote.save();
    console.log('저장 성공', vote);
    res.status(201).json({ message: '투표가 저장되었습니다' });
  } catch (error) {
    console.error('저장 실패', error);
    res.status(500).json({ error: '투표 저장 중 오류가 발생했습니다' });
  }
});

app.put('/vote/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    // 투표 업데이트
    const updatedVote = await Vote.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    console.log('업데이트 성공:', updatedVote);
    res.status(200).json(updatedVote); // 업데이트된 투표의 정보만 반환
  } catch (error) {
    console.error('업데이트 실패:', error);
    res.status(500).json({ error: '투표 업데이트 중 오류가 발생했습니다' });
  }
});

app.delete('/vote/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Vote.findByIdAndDelete(id);
    console.log('삭제 성공');
    res.status(200).json({ message: '투표가 삭제되었습니다' });
  } catch (error) {
    console.error('삭제 실패', error);
    res
      .status(500)
      .json({ error: '투표 목록을 삭제하는 중 오류가 발생했습니다' });
  }
});

app.post('/vote/:id/click', async (req, res) => {
  try {
    const { id } = req.params;
    const { itemId } = req.body;

    // 특정 투표 항목의 클릭 정보 업데이트
    await Vote.findOneAndUpdate(
      { _id: id, 'content.value': itemId },
      { $inc: { 'content.$.clicks': 1 } },
      { upsert: true, new: true }
    );

    console.log('클릭 정보가 저장되었습니다.');
    res.status(200).json({ message: '클릭 정보가 저장되었습니다.' });
  } catch (error) {
    console.error('클릭 정보 저장 실패: ', error);
    res
      .status(500)
      .json({ error: '클릭 정보를 저장하는 중 오류가 발생했습니다.' });
  }
});

app.get('/vote/:id/clicks', async (req, res) => {
  try {
    const { id } = req.params;
    const vote = await Vote.findById(id);
    if (!vote) {
      return res.status(404).json({ error: '투표가 존재하지 않습니다.' });
    }
    const clicks = vote.content.map((item) => item.clicks);
    res.status(200).json({ clicks });
  } catch (error) {
    console.error('클릭 정보 가져오기 실패: ', error);
    res
      .status(500)
      .json({ error: '클릭 정보를 가져오는 중 오류가 발생했습니다.' });
  }
});

app.post('/join', async (req, res) => {
  try {
    const { userID, password } = req.body;

    const existingUser = await User.findOne({ userID });

    if (existingUser) {
      return res.status(400).json({ error: '이미 존재하는 userID입니다.' });
    }

    const user = new User({ userID, password });
    await user.save();
    console.log('가입 성공', user);
    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    console.error('회원가입 실패: ', error);
    res.status(500).json({ error: '회원가입 중 오류가 발생했습니다.' });
  }
});

const voteRoutes = require('./routes/vote');
app.use('/vote', voteRoutes);

// 정적 파일 제공 (React 앱 빌드 파일)
app.use(express.static(path.join(__dirname, '..', 'build')));

// 모든 경로에 대해 React 앱으로 라우팅
app.get('/*', (req, res) => {
  res.set({
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Date: Date.now(),
  });
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
http.createServer(app).listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
