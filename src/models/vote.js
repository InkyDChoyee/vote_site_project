const mongoose = require('mongoose');

// 투표 모델 스키마 정의
const voteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [
      {
        value: String,
        clicks: { type: Number, default: 0 },
      },
    ],
    required: true,
  },
});

// Vote 모델 생성
const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
