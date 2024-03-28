import React, { useState } from "react";
import axios from "axios";

const AddVoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);

      // 추가: axios 요청에 Origin 헤더 포함
      const response = await axios.post(
        "http://localhost:3001/api/votes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Origin: "http://localhost:3000", // 클라이언트 주소
          },
        }
      );

      console.log("투표가 추가되었습니다.");
    } catch (error) {
      console.error("투표 추가 오류", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
      />
      <button type="submit">투표 추가</button>
    </form>
  );
};

export default AddVoteForm;
