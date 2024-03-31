import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [votes, setVotes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/vote", { title, content });
      alert("투표가 저장되었습니다.");
      fetchVotes(); // 투표가 저장된 후 투표 목록 다시 불러오기
    } catch (error) {
      console.error("투표 저장 실패:", error);
    }
  };

  async function fetchVotes() {
    try {
      const response = await axios.get("http://localhost:5000/votes");
      setVotes(response.data);
    } catch (error) {
      console.error("투표 목록 가져오기 실패:", error);
    }
  }

  useEffect(() => {
    fetchVotes(); // 초기 렌더링 시 투표 목록 불러오기
  }, []);

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
      <h2>투표 목록</h2>
      <ul>
        {votes.map((vote) => (
          <li key={vote._id}>{vote.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
