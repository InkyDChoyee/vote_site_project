// 3. 리액트 앱과 연결
import axios from "axios";

const addVote = async (title, content) => {
  try {
    const response = await axios.post("http://localhost:3001/api/votes", {
      title,
      content,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("데이터 추가 오류", error);
    throw error;
  }
};
