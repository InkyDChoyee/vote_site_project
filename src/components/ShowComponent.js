import React from "react";
import CreateVote from "./CreateVote";
import VoteList from "./VoteList";
import VoteDetail from "./VoteDetail";

const ShowComponent = ({
  showHomeButton,
  handleHomeButtonClick,
  showCreateVote,
  setShowCreateVote,
  setShowHomeButton,
  showVoteList,
  setShowVoteList,
  selectedVoteId,
  setSelectedVoteId,
  fetchVotes,
  votes,
  returnToList,
}) => {
  return (
    <div className="show_component">
      {showCreateVote && (
        <CreateVote fetchVotes={fetchVotes} onReturnToList={returnToList} />
      )}
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
      <div className="home_btn">
        {showHomeButton && <button onClick={handleHomeButtonClick}>홈</button>}
      </div>
    </div>
  );
};

export default ShowComponent;
