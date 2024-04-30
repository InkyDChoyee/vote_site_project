import React, { useState } from 'react';
import axios from 'axios';
import './CreateVote.css';

function CreateVote({ fetchVotes, onReturnToList }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedContent = content.filter((obj) => obj.value !== '');

      console.log('Formatted Content:', formattedContent);
      console.log('Content Type:', typeof formattedContent); // content의 데이터 타입 확인

      // await axios.post("http://43.202.6.49:8000/vote", {
      await axios.post('http://localhost:5000/vote', {
        title,
        content: formattedContent,
      });
      alert('투표가 저장되었습니다.');
      fetchVotes();
      onReturnToList();
    } catch (error) {
      console.error('투표 저장 실패:', error);
    }
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...content];
    updatedOptions[index] = { value: value }; // 사용자가 입력한 값을 value 속성에 저장
    setContent(updatedOptions);
    console.log('Updated Options:', updatedOptions);
  };

  const handleAddOption = () => {
    setContent([...content, { value: '' }]); // 새로운 항목 추가
  };

  return (
    <div>
      <h1>투표 만들기</h1>
      <form onSubmit={handleSubmit}>
        <div className="vote_title">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="투표 주제"
          />
        </div>
        <div className="vote_content">
          {content.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option.value}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder="투표 항목"
              />
            </div>
          ))}
          <button
            className="add_content_btn"
            type="button"
            onClick={handleAddOption}>
            항목 추가
          </button>
        </div>
        <button className="save_btn" type="submit">
          저장
        </button>
      </form>
    </div>
  );
}

export default CreateVote;
