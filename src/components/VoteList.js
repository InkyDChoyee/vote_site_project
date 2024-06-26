// VoteList.js
import React from "react";
import "./VoteList.css";

function VoteList({ votes, onSelectVote }) {
  return (
    <div>
      <h1>투표 목록</h1>
      <div className="list">
        <ul>
          {votes.map((vote) => (
            <li key={vote._id}>
              <button onClick={() => onSelectVote(vote._id)}>
                {vote.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VoteList;
