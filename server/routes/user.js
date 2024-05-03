const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 회원가입 라우트
router.post('/signup', async (req, res) => {
  try {
    const { userID, password } = req.body;

    // 이미 존재하는 사용자인지 확인
    const existingUser = await User.findOne({ userID });

    if (existingUser) {
      return res.status(400).json({ error: '이미 존재하는 userID입니다.' });
    }

    // 새로운 사용자 생성
    const newUser = new User({ userID, password });
    await newUser.save();
    console.log('회원가입 성공', newUser);
    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    console.error('회원가입 실패: ', error);
    res.status(500).json({ error: '회원가입 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
