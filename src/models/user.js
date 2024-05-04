// src/models/User.js

const mongoose = require('mongoose');

// 투표 모델 스키마 정의
const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// User 모델 생성
const User = mongoose.model('User', userSchema);

module.exports = User;
