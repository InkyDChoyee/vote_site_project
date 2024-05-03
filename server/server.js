require('dotenv').config(); // dotenv 로드

const http = require('http');
const express = require('express'); // express 모듈 호출
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const config = require('../config/config');
const User = require('../src/models/user'); // 모델 경로 수정
const Vote = require('../src/models/vote'); // 모델 경로 수정

const app = express(); // express 앱 생성

app.use(bodyParser.json());
app.use(
  cors({
    origin: ['http://43.202.6.49:8000', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

const uri = config.mongoURI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB에 연결되었습니다.');
  })
  .catch((error) => {
    console.error('MongoDB 연결 오류:', error);
  });

// votes 라우트 적용
const voteRoutes = require('./routes/vote');
app.use('/vote', voteRoutes);

// user 라우트 적용
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

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
