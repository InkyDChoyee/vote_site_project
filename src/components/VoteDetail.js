// VoteDetail.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function VoteDetail({ voteId, fetchVote }) {
  const [vote, setVote] = useState(null);

  const [totalClicks, setTotalClicks] = useState(0);
  const [itemClicks, setItemClicks] = useState({});

  useEffect(() => {
    async function fetchVoteData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/vote/${voteId}`
        );
        setVote(response.data);
      } catch (error) {
        console.error("투표 불러오기 실패: ", error);
      }
    }
    fetchVoteData();
  }, [voteId]); // voteId가 변경될 때마다 해당 투표의 정보를 다시 가져옴

  const handleClick = async (index) => {
    setTotalClicks(totalClicks + 1);
    const updatedItemClicks = { ...itemClicks };
    updatedItemClicks[index] = (updatedItemClicks[index] || 0) + 1;
    setItemClicks(updatedItemClicks);

    try {
      await axios.post(`http://localhost:5000/vote/${voteId}/click`, {
        itemId: vote.content[index].value,
      });
      console.log("클릭 정보가 서버에 전송되었습니다.");
    } catch (error) {
      console.error("클릭 정보 전송 실패: ", error);
    }
  };

  if (!vote) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{vote.title}</h2>
      <ul>
        {vote.content.map((item, index) => (
          <li key={index} onClick={() => handleClick(index)}>
            {item.value} - {itemClicks[index] || 0} clicks (
            {(((itemClicks[index] || 0) / totalClicks) * 100).toFixed(2)}%)
          </li>
        ))}
      </ul>
      <p>Total Clicks: {totalClicks}</p>
    </div>
  );
}

export default VoteDetail;
