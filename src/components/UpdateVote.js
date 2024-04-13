import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateVote({ voteId, fetchVotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([]);

  useEffect(() => {
    // 투표 정보 불러오기
    const fetchVote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/vote/${voteId}`
        );
        const { title, content } = response.data;
        setTitle(title);
        setContent(content);
      } catch (error) {
        console.error("투표 정보 불러오기 실패:", error);
      }
    };

    fetchVote();
  }, [voteId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/vote/${voteId}`, {
        title,
        content,
      });
      alert("투표가 업데이트되었습니다.");
      fetchVotes();
    } catch (error) {
      console.error("투표 업데이트 실패:", error);
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...content];
    updatedOptions[index] = { value: value };
    setContent(updatedOptions);
  };

  const handleAddOption = () => {
    setContent([...content, { value: "" }]);
  };

  return (
    <div>
      <h1>투표 수정하기</h1>
      <form onSubmit={handleSubmit}>
        <label>
          제목:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          투표 항목:
          {content.map((option, index) => (
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
