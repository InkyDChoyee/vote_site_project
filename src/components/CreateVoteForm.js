// components/CreateVoteForm.js

import React, { useState } from "react";
import axios from "axios";

const CreateVoteForm = () => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/vote/create", { title, options });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
        />
      ))}
      <button type="button" onClick={() => setOptions([...options, ""])}>
        옵션 추가
      </button>
      <button type="submit">투표 생성</button>
    </form>
  );
};

export default CreateVoteForm;
