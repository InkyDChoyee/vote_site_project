import React, { useState } from "react";
import axios from "axios";

function CreateVote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/vote", { title, content });
      alert("투표가 저장되었습니다.");
    } catch (error) {
      console.error("투표 저장 실패:", error);
    }
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
          내용:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default CreateVote;
