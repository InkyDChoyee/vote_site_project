const JoinMember = () => {
  return (
    <div>
      <h1>회원 가입</h1>
      <form onSubmit={handleSubmit}>
        <div className="user_id">
          <input type="text" value={userID} placeholder="아이디"></input>
        </div>
        <div className="password">
          <input
            type="password"
            value={password}
            placeholder="비밀번호"></input>
          <input type="password" placeholder="비밀번호 확인"></input>
        </div>
        <button className="save_btn" type="submit">
          가입
        </button>
      </form>
    </div>
  );
};

export default JoinMember;
