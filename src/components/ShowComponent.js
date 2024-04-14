import React from "react";
import CreateVote from "./CreateVote";
import VoteList from "./VoteList";
import VoteDetail from "./VoteDetail";

const home_btn_icon = "/resources/home_btn.png";

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
      <div className="home_btn">
        {showHomeButton && (
          <button onClick={handleHomeButtonClick}>
            <img
              src={`${process.env.PUBLIC_URL}` + home_btn_icon}
              alt="home_icon"
            ></img>
          </button>
        )}
      </div>
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
        <VoteDetail
          voteId={selectedVoteId}
          onReturnToList={returnToList}
          fetchVotes={fetchVotes}
        />
      )}
    </div>
  );
};

export default ShowComponent;
