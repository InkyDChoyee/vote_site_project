// VoteList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function VoteList({ fetchVotes, onSelectVote }) {
  const [votes, setVotes] = useState([]);

  async function deleteVote(id) {
    try {
      await axios.delete(`http://localhost:5000/vote/${id}`);
      fetchVotes(); // 투표 삭제 후 목록 갱신
    } catch (error) {
      console.error("투표 삭제 실패: ", error);
    }
  }

  useEffect(() => {
    fetchVotes(); // 초기 렌더링 시 투표 목록 불러오기
  }, []);

  return (
    <div>
      <h2>투표 목록</h2>
      <ul>
        {votes.map((vote) => (
          <li key={vote._id}>
            {vote.title}
            <button onClick={() => onSelectVote(vote._id)}>보기</button>
            <button onClick={() => deleteVote(vote._id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VoteList;
