import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateVote from './UpdateVote';
import './VoteDetail.css';

function VoteDetail({ voteId, onReturnToList, fetchVotes }) {
  const [vote, setVote] = useState(null);
  const [totalClicks, setTotalClicks] = useState(0);
  const [itemClicks, setItemClicks] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, [voteId]);

  const fetchData = async () => {
    try {
      const [voteResponse, clickResponse] = await Promise.all([
        // axios.get(`http://43.202.6.49:8000/vote/${voteId}`),
        // axios.get(`http://43.202.6.49:8000/vote/${voteId}/clicks`),
        axios.get(`http://localhost:5000/vote/${voteId}`),
        axios.get(`http://localhost:5000/vote/${voteId}/clicks`),
      ]);
      const { data: voteData } = voteResponse;
      setVote(voteData);

      const { clicks } = clickResponse.data;
      if (Object.keys(clicks).length === 0) {
        setTotalClicks(0);
        setItemClicks({});
      } else {
        const updatedItemClicks = {};
        voteData.content.forEach((_, index) => {
          updatedItemClicks[index] = clicks[index] || 0;
        });
        setItemClicks(updatedItemClicks);
        setTotalClicks(
          Object.values(clicks).reduce((acc, curr) => acc + curr, 0)
        );
      }
    } catch (error) {
      console.error('데이터 가져오기 실패: ', error);
    }
  };

  const handleClick = async (index) => {
    try {
      // await axios.post(`http://43.202.6.49:8000/vote/${voteId}/click`, {
      await axios.post(`http://localhost:5000/vote/${voteId}/click`, {
        itemId: vote.content[index].value,
      });
      const updatedItemClicks = { ...itemClicks };
      updatedItemClicks[index] = (updatedItemClicks[index] || 0) + 1;
      setItemClicks(updatedItemClicks);
      setTotalClicks(totalClicks + 1);
      console.log('클릭 정보가 서버에 전송되었습니다.');
    } catch (error) {
      console.error('클릭 정보 전송 실패: ', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDeleteVote = async () => {
    try {
      // await axios.delete(`http://43.202.6.49:8000/vote/${voteId}`);
      await axios.delete(`http://localhost:5000/vote/${voteId}`);
      console.log('투표가 삭제되었습니다.');
      fetchData();
      fetchVotes();
      await onReturnToList();
    } catch (error) {
      console.error('투표 삭제 실패: ', error);
    }
  };

  const handleUpdateVote = async () => {
    setIsEditing(false);
    await fetchData();
  };

  return (
    <div>
      {isEditing ? (
        <UpdateVote voteId={voteId} onEditComplete={handleUpdateVote} />
      ) : vote ? (
        <div>
          <div className="btn_box">
            <span className="show_scroll">
              ✏️
              <ul className="btn_scroll">
                <li>
                  <button onClick={handleEditClick}>수정</button>
                </li>
                <li>
                  <button onClick={handleDeleteVote}>삭제</button>
                </li>
                <li>
                  <button onClick={onReturnToList}>목록</button>
                </li>
              </ul>
            </span>
          </div>
          <div className="vote_detail_title">
            <h2>{vote.title}</h2>
          </div>
          <div className="vote_detail_content">
            <ul>
              {vote.content.map((item, index) => (
                <li key={index} onClick={() => handleClick(index)}>
                  <button>
                    <span>{item.value} </span>
                    <span>
                      {itemClicks[index] || 0} clicks (
                      {totalClicks === 0
                        ? 0
                        : (
                            ((itemClicks[index] || 0) / totalClicks) *
                            100
                          ).toFixed(2)}
                      %)
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <p className="total_vote">총 투표수: {totalClicks}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default VoteDetail;
