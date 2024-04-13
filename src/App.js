import React, { useState, useEffect } from "react";
import CreateVote from "./components/CreateVote";
import VoteList from "./components/VoteList";
import VoteDetail from "./components/VoteDetail";
import axios from "axios";

function App() {
  const [selectedVoteId, setSelectedVoteId] = useState(null);
  const [votes, setVotes] = useState([]);
  const [showVoteList, setShowVoteList] = useState(false);
  const [showCreateVote, setShowCreateVote] = useState(false);
  const [showHomeButton, setShowHomeButton] = useState(false);

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

  useEffect(() => {
    fetchVotes();
  }, []);

  const returnToList = () => {
    setSelectedVoteId(null);
    setShowHomeButton(true);
    setShowVoteList(true);
  };

  const handleHomeButtonClick = () => {
    setSelectedVoteId(null);
    setShowCreateVote(false);
    setShowVoteList(false);
    setShowHomeButton(false);
  };

  return (
    <div>
      {!showHomeButton && !showVoteList && !showCreateVote && (
        <>
          <button
            onClick={() => {
              setShowVoteList(true);
              setShowHomeButton(true);
            }}
          >
            투표 목록
          </button>
          <button
            onClick={() => {
              setShowCreateVote(true);
              setShowHomeButton(true);
            }}
          >
            투표 생성
          </button>
        </>
      )}
      {showHomeButton && <button onClick={handleHomeButtonClick}>홈</button>}
      {showCreateVote && <CreateVote fetchVotes={fetchVotes} />}
      {showVoteList && (
        <VoteList
          fetchVotes={fetchVotes}
          votes={votes}
          onSelectVote={(voteId) => {
            setSelectedVoteId(voteId);
            setShowVoteList(false);
            setShowCreateVote(false);
            setShowHomeButton(true);
          }}
        />
      )}
      {selectedVoteId && (
        <VoteDetail voteId={selectedVoteId} onReturnToList={returnToList} />
      )}
    </div>
  );
}

export default App;
