import { useState } from 'react';
import axios from 'axios';

const JoinMember = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/join', {
        userID,
        password,
      });
      alert('회원가입이 완료되었습니다.');
    } catch (error) {
      console.error('회원가입 실패: ', error);
    }
  };

  return (
    <div>
      <h1>회원 가입</h1>
      <form onSubmit={handleSubmit}>
        <div className="user_id_box">
          <input
            className="user_id"
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            placeholder="아이디"></input>
        </div>
        <div className="password_box">
          <input
            className="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"></input>
          <input
            className="password_confirm"
            type="password"
            placeholder="비밀번호 확인"></input>
        </div>
        <button className="save_btn" type="submit">
          가입
        </button>
      </form>
    </div>
  );
};

export default JoinMember;
