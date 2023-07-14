import axios from "axios";

// 게시물 조회
const getPosts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`);
  return response.data;
};

// 게시물 추가
const addPosts = async (newPost) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, newPost);
};

// 게시물 수정
const modifyPosts = async ({ contentId, changePost }) => {
  await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/posts/${contentId}`,
    changePost
  );
};

// 게시물 삭제
const deletePosts = async (contentId) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${contentId}`);
};

export { getPosts, addPosts, modifyPosts, deletePosts };
