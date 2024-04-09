// components/Vote.js

import React, { useState } from "react";
import axios from "axios";

const Vote = ({ vote }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/vote/${vote._id}/vote`, {
        option: selectedOption,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>{vote.title}</h3>
      <form onSubmit={handleSubmit}>
        {vote.options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              name="option"
              value={option.name}
              checked={selectedOption === option.name}
              onChange={() => setSelectedOption(option.name)}
            />
            <label>{option.name}</label>
          </div>
        ))}
        <button type="submit">투표</button>
      </form>
    </div>
  );
};

export default Vote;
