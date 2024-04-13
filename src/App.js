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
      setVotes(response.data);
    } catch (error) {
      console.error("투표 목록 가져오기 실패:", error);
    }
  }

  function handleSelectVote(voteId) {
    setSelectedVoteId(voteId);
  }

  useEffect(() => {
    fetchVotes();
  }, []);

  return (
    <div>
      <CreateVote fetchVotes={fetchVotes} />
      <VoteList
        fetchVotes={fetchVotes}
        votes={votes}
        onSelectVote={handleSelectVote}
      />
      {selectedVoteId && (
        <VoteDetail
          voteId={selectedVoteId}
          fetchVote={fetchVote}
          handleUpdateVote={setSelectedVoteId}
        />
      )}
    </div>
  );
}

export default App;
