// VoteDetail.js
import React, { useState, useEffect } from "react";
import axios from "axios";

function VoteDetail({ voteId, fetchVote }) {
  const [vote, setVote] = useState(null);
  const [totalClicks, setTotalClicks] = useState(0);
  const [itemClicks, setItemClicks] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const voteResponse = await axios.get(
          `http://localhost:5000/vote/${voteId}`
        );
        setVote(voteResponse.data);

        const clickResponse = await axios.get(
          `http://localhost:5000/vote/${voteId}/clicks`
        );
        const { clicks } = clickResponse.data;

        if (Object.keys(clicks).length === 0) {
          setTotalClicks(0);
          setItemClicks({});
        } else {
          const updatedItemClicks = {};
          for (
            let index = 0;
            index < voteResponse.data.content.length;
            index++
          ) {
            updatedItemClicks[index] = clicks[index] || 0;
          }
          setItemClicks(updatedItemClicks);

          let total = 0;
          for (const click of Object.values(clicks)) {
            total += click;
          }
          setTotalClicks(total);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패: ", error);
      }
    }

    // voteId가 변경되었을 때에만 fetchData 함수를 호출하도록 수정
    if (voteId !== null) {
      fetchData();
    }
  }, [voteId]);

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
            {totalClicks === 0
              ? 0
              : (((itemClicks[index] || 0) / totalClicks) * 100).toFixed(2)}
            %)
          </li>
        ))}
      </ul>
      <p>Total Clicks: {totalClicks}</p>
    </div>
  );
}

export default VoteDetail;
