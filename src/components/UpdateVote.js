import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateVote({ voteId, onEditComplete }) {
  const [voteData, setVoteData] = useState({ title: "", content: [] });

  useEffect(() => {
    const fetchVote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/vote/${voteId}`
        );
        setVoteData(response.data);
      } catch (error) {
        console.error("투표 정보 불러오기 실패:", error);
      }
    };

    fetchVote();
  }, [voteId]);

  const handleOptionChange = (index, value) => {
    setVoteData((prevData) => {
      const updatedOptions = [...prevData.content];
      updatedOptions[index] = { value };
      return { ...prevData, content: updatedOptions };
    });
  };

  const handleAddOption = () => {
    setVoteData((prevData) => ({
      ...prevData,
      content: [...prevData.content, { value: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/vote/${voteId}`, voteData);
      alert("투표가 업데이트되었습니다.");
      onEditComplete(); // 수정이 완료되면 부모 컴포넌트에 알림
    } catch (error) {
      console.error("투표 업데이트 실패:", error);
    }
  };

  return (
    <div>
      <h1>투표 수정하기</h1>
      <form onSubmit={handleSubmit}>
        <label>
          제목:
          <input
            type="text"
            value={voteData.title}
            onChange={(e) =>
              setVoteData({ ...voteData, title: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          투표 항목:
          {voteData.content.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option.value}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>
            추가
          </button>
        </label>
        <br />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default UpdateVote;
