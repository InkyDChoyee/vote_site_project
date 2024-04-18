import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ShowComponent from "./components/ShowComponent";
import MainMenuButton from "./components/MainMenuButton";

function App() {
  const [selectedVoteId, setSelectedVoteId] = useState(null);
  const [votes, setVotes] = useState([]);
  const [showVoteList, setShowVoteList] = useState(false);
  const [showCreateVote, setShowCreateVote] = useState(false);
  const [showHomeButton, setShowHomeButton] = useState(false);

  async function fetchVote(voteId) {
    try {
      const response = await axios.get(
        `http://43.202.64.34:8000//vote/${voteId}`
      );
      return response.data;
    } catch (error) {
      console.error("투표 불러오기 실패: ", error);
      return null;
    }
  }

  async function fetchVotes() {
    try {
      const response = await axios.get("http://43.202.64.34:8000//votes");
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
    setShowCreateVote(false);
  };

  const handleHomeButtonClick = () => {
    setSelectedVoteId(null);
    setShowCreateVote(false);
    setShowVoteList(false);
    setShowHomeButton(false);
  };

  return (
    <div className="container">
      <nav></nav>
      <div className="content_box">
        <section>
          <div className="section_top"></div>
          <MainMenuButton
            showHomeButton={showHomeButton}
            setShowHomeButton={setShowHomeButton} // setShowHomeButton 함수 전달
            showVoteList={showVoteList}
            setShowVoteList={setShowVoteList}
            showCreateVote={showCreateVote}
            setShowCreateVote={setShowCreateVote}
          />
          <ShowComponent
            showHomeButton={showHomeButton}
            handleHomeButtonClick={handleHomeButtonClick}
            showCreateVote={showCreateVote}
            setShowCreateVote={setShowCreateVote}
            showVoteList={showVoteList}
            setShowVoteList={setShowVoteList}
            selectedVoteId={selectedVoteId}
            setSelectedVoteId={setSelectedVoteId}
            fetchVotes={fetchVotes}
            fetchVote={fetchVote}
            votes={votes}
            returnToList={returnToList}
            setShowHomeButton={setShowHomeButton} // setShowHomeButton 함수 전달
          />
        </section>
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
