import React from "react";

const MainMenuButton = ({
  showHomeButton,
  setShowHomeButton,
  showVoteList,
  setShowVoteList,
  showCreateVote,
  setShowCreateVote,
}) => {
  return (
    <div className="main_menu_btn">
      {!showHomeButton && !showVoteList && !showCreateVote && (
        <>
          <button
            className="show_vote_list"
            onClick={() => {
              setShowVoteList(true);
              setShowHomeButton(true);
            }}
          >
            투표 목록
          </button>
          <button
            className="show_vote_create"
            onClick={() => {
              setShowCreateVote(true);
              setShowHomeButton(true);
            }}
          >
            투표 생성
          </button>
        </>
      )}
    </div>
  );
};

export default MainMenuButton;
