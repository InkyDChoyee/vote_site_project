// App.js
import React, { useState, useEffect } from "react";
import CreateVote from "./components/CreateVote";
import VoteList from "./components/VoteList";
import VoteDetail from "./components/VoteDetail";
import axios from "axios";

function App() {
  const [selectedVoteId, setSelectedVoteId] = useState(null);
  const [votes, setVotes] = useState([]);

  async function fetchVote(voteId) {
    try {
      const response = await axios.get(`http://localhost:5000/vote/${voteId}`);
      return response.data;
    } catch (error) {
      console.error("투표 불러오기 실패: ", error);
      return null;
    }
  }

  async function fetchVotes() {
    try {
      const response = await axios.get("http://localhost:5000/votes");
      const votesData = response.data; // 받아온 데이터
      setVotes(votesData); // 상태 업데이트
    } catch (error) {
      console.error("투표 목록 가져오기 실패:", error);
    }
  }

  function handleSelectVote(voteId) {
    setSelectedVoteId(voteId);
  }

  useEffect(() => {
    fetchVotes(); // 초기 렌더링 시 투표 목록 불러오기
  }, []);

  return (
    <div>
      <CreateVote fetchVotes={fetchVotes} />
      <VoteList votes={votes} onSelectVote={handleSelectVote} />
      {selectedVoteId && (
        <VoteDetail voteId={selectedVoteId} fetchVote={fetchVote} />
      )}
    </div>
  );
}

export default App;
