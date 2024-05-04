const express = require('express');
const router = express.Router();
const {
  requireLogin,
  isVoteAuthor,
} = require('../../src/middleware/authorization');
const Vote = require('../../src/models/vote');

// 투표 목록 가져오기
router.get('vote/', async (req, res) => {
  try {
    const votes = await Vote.find();
    res.status(200).json(votes);
  } catch (error) {
    console.error('투표 목록 가져오기 실패: ', error);
    res
      .status(500)
      .json({ error: '투표 목록을 가져오는 중 오류가 발생했습니다' });
  }
});

// 특정 투표 가져오기
router.get('vote/:id', async (req, res) => {
  try {
    const vote = await Vote.findById(req.params.id);
    if (!vote) {
      return res.status(404).json({ error: '투표를 찾을 수 없습니다.' });
    }
    res.status(200).json(vote);
  } catch (error) {
    console.error('투표 가져오기 실패: ', error);
    res.status(500).json({ error: '투표 가져오는 중 오류가 발생했습니다' });
  }
});

// 투표 작성하기
router.post('vote/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const vote = new Vote({ title, content });
    await vote.save();
    console.log('투표 저장 성공', vote);
    res.status(201).json({ message: '투표가 저장되었습니다', vote });
  } catch (error) {
    console.error('투표 저장 실패', error);
    res.status(500).json({ error: '투표 저장 중 오류가 발생했습니다' });
  }
});

// 투표 수정하기
router.put('vote/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedVote = await Vote.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    console.log('투표 업데이트 성공:', updatedVote);
    res.status(200).json({ message: '투표가 수정되었습니다', updatedVote });
  } catch (error) {
    console.error('투표 업데이트 실패:', error);
    res.status(500).json({ error: '투표 업데이트 중 오류가 발생했습니다' });
  }
});

// 투표 삭제하기
router.delete('vote/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Vote.findByIdAndDelete(id);
    console.log('투표 삭제 성공');
    res.status(200).json({ message: '투표가 삭제되었습니다' });
  } catch (error) {
    console.error('투표 삭제 실패', error);
    res.status(500).json({ error: '투표 삭제 중 오류가 발생했습니다' });
  }
});

// 투표 항목의 클릭 정보 업데이트하기
router.post('vote/:id/click', async (req, res) => {
  try {
    const { id } = req.params;
    const { itemId } = req.body;

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

// 투표 항목의 클릭 수 가져오기
router.get('vote/:id/clicks', async (req, res) => {
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

module.exports = router;
