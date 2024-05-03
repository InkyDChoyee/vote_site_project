const User = require('../models/user');
const Vote = require('../models/vote');

// 글을 쓰기 전에 사용자가 로그인되어 있는지 확인하는 미들웨어
exports.requireLogin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: '로그인이 필요합니다.' });
  }
  next();
};

// 사용자가 글을 작성한 사용자인지 확인하는 미들웨어
exports.isVoteAuthor = async (req, res, next) => {
  const { id } = req.params;
  const vote = await Vote.findById(id);
  if (!vote) {
    return res.status(404).json({ error: '해당 글을 찾을 수 없습니다.' });
  }
  if (vote.author.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ error: '글을 작성한 사용자만 수정 및 삭제할 수 있습니다.' });
  }
  next();
};
