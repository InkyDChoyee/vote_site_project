// VoteList.js
import React from "react";
import axios from "axios";

function VoteList({ fetchVotes, votes, onSelectVote }) {
  return (
    <div>
      <h2>투표 목록</h2>
      <ul>
        {votes.map((vote) => (
          <li key={vote._id}>
            {/* 투표 항목 클릭 시 onSelectVote 호출 */}
            <p onClick={() => onSelectVote(vote._id)}>{vote.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VoteList;
