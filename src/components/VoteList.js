import React, { useState, useEffect } from "react";
import axios from "axios";

function VoteList() {
  const [votes, setVotes] = useState([]);

  async function fetchVotes() {
    try {
      const response = await axios.get("http://localhost:5000/votes");
      setVotes(response.data);
    } catch (error) {
      console.error("투표 목록 가져오기 실패:", error);
    }
  }

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
            <button onClick={() => deleteVote(vote._id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VoteList;
