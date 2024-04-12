// VoteList.js
import React from "react";
import axios from "axios";

function VoteList({ fetchVotes, votes, onSelectVote }) {
  async function deleteVote(id) {
    try {
      await axios.delete(`http://localhost:5000/vote/${id}`);
      await fetchVotes(); // fetchVotes 함수가 완료될 때까지 기다립니다.
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
            <p onClick={() => onSelectVote(vote._id)}>{vote.title}</p>
            <button onClick={() => deleteVote(vote._id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VoteList;
