// VoteDetail.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function VoteDetail({ voteId, fetchVote }) {
  const [vote, setVote] = useState(null);

  useEffect(() => {
    async function fetchVoteData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/vote/${voteId}`
        );
        setVote(response.data);
      } catch (error) {
        console.error("투표 불러오기 실패: ", error);
      }
    }
    fetchVoteData();
  }, [voteId]); // voteId가 변경될 때마다 해당 투표의 정보를 다시 가져옴

  if (!vote) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{vote.title}</h2>
      <p>작성자: {vote.author}</p>
      <p>내용: {vote.content}</p>
    </div>
  );
}

export default VoteDetail;
