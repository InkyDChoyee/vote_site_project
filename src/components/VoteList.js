// VoteList.js
import React from "react";
import axios from "axios";

function VoteList({ votes, onSelectVote }) {
  async function deleteVote(id) {
    try {
      await axios.delete(`http://localhost:5000/vote/${id}`);
      // fetchVotes(); // 이 부분을 제거합니다.
    } catch (error) {
      console.error("투표 삭제 실패: ", error);
    }
  }

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
