import React, { useState } from "react";
import axios from "axios";

function CreateVote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState([]);
  const [newOption, setNewOption] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // 이벤트의 기본 동작을 중지하는 함수 = 이후에 원하는 동작 추가 가능
    try {
      await axios.post("http://localhost:5000/vote", { title, content });
      alert("투표가 저장되었습니다.");
    } catch (error) {
      console.error("투표 저장 실패:", error);
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...content];
    updatedOptions[index] = value;
    setContent(updatedOptions);
  };

  const handleAddOption = () => {
    setContent([...content, newOption]);
    setNewOption("");
  };

  return (
    <div>
      <h1>투표 만들기</h1>
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
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
          <div>
            <input
              type="text"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
            />
            <button type="button" onClick={handleAddOption}>
              +
            </button>
          </div>
        </label>
        <br />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default CreateVote;
