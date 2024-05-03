// routes/vote.js

const express = require('express');
const router = express.Router();
const { requireLogin, isVoteAuthor } = require('../middleware/authorization');
const Vote = require('../models/vote');

// 글 작성 라우트
router.post('/', requireLogin, async (req, res) => {
  // 글 작성 코드
});

// 글 수정 라우트
router.put('/:id', requireLogin, isVoteAuthor, async (req, res) => {
  // 글 수정 코드
});

// 글 삭제 라우트
router.delete('/:id', requireLogin, isVoteAuthor, async (req, res) => {
  // 글 삭제 코드
});

module.exports = router;
