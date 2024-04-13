// VoteDetail.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateVote from "./UpdateVote";
import VoteList from "./VoteList"; // VoteList 컴포넌트 추가

function VoteDetail({ voteId, onReturnToList }) {
  const [vote, setVote] = useState(null);
  const [totalClicks, setTotalClicks] = useState(0);
  const [itemClicks, setItemClicks] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showVoteList, setShowVoteList] = useState(false); // VoteList를 보여줄 상태 추가
  const [votes, setVotes] = useState([]); // votes 상태 추가

  useEffect(() => {
    fetchData();
  }, [voteId]);

  const fetchData = async () => {
    try {
      const [voteResponse, clickResponse] = await Promise.all([
        axios.get(`http://localhost:5000/vote/${voteId}`),
        axios.get(`http://localhost:5000/vote/${voteId}/clicks`),
      ]);
      const { data: voteData } = voteResponse;
      setVote(voteData);

      const { clicks } = clickResponse.data;
      if (Object.keys(clicks).length === 0) {
        setTotalClicks(0);
        setItemClicks({});
      } else {
        const updatedItemClicks = {};
        voteData.content.forEach((_, index) => {
          updatedItemClicks[index] = clicks[index] || 0;
        });
        setItemClicks(updatedItemClicks);
        setTotalClicks(
          Object.values(clicks).reduce((acc, curr) => acc + curr, 0)
        );
      }

      // 여기서 투표 목록 데이터를 가져와서 votes 상태에 설정
      const votesResponse = await axios.get("http://localhost:5000/votes");
      setVotes(votesResponse.data);
    } catch (error) {
      console.error("데이터 가져오기 실패: ", error);
    }
  };

  const handleClick = async (index) => {
    try {
      await axios.post(`http://localhost:5000/vote/${voteId}/click`, {
        itemId: vote.content[index].value,
      });
      const updatedItemClicks = { ...itemClicks };
      updatedItemClicks[index] = (updatedItemClicks[index] || 0) + 1;
      setItemClicks(updatedItemClicks);
      setTotalClicks(totalClicks + 1);
      console.log("클릭 정보가 서버에 전송되었습니다.");
    } catch (error) {
      console.error("클릭 정보 전송 실패: ", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateVote = async () => {
    setIsEditing(false);
    await fetchData();
  };

  const handleReturnToList = () => {
    setShowVoteList(true); // VoteList를 보여주도록 상태 변경
    // onReturnToList(); // 부모 컴포넌트에서 정의된 목록으로 돌아가기 함수 호출
  };

  return (
    <div>
      {showVoteList ? ( // VoteList 상태에 따라 VoteList 컴포넌트를 렌더링
        <VoteList fetchVotes={fetchData} votes={votes} />
      ) : (
        <>
          {isEditing ? (
            <UpdateVote voteId={voteId} onEditComplete={handleUpdateVote} />
          ) : vote ? (
            <div>
              <h2>{vote.title}</h2>
              <button onClick={handleEditClick}>투표 수정하기</button>
              <button onClick={handleReturnToList}>목록으로 돌아가기</button>
              <ul>
                {vote.content.map((item, index) => (
                  <li key={index} onClick={() => handleClick(index)}>
                    {item.value} - {itemClicks[index] || 0} clicks (
                    {totalClicks === 0
                      ? 0
                      : (
                          ((itemClicks[index] || 0) / totalClicks) *
                          100
                        ).toFixed(2)}
                    %)
                  </li>
                ))}
              </ul>
              <p>Total Clicks: {totalClicks}</p>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </>
      )}
    </div>
  );
}

export default VoteDetail;
