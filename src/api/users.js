import axios from "axios";

// 회원가입
const signUp = async (userData) => {
  const data = await axios.post(
    `${process.env.REACT_APP_LOGIN_URL}/register`,
    userData
  );
  return data;
};

// 회원 정보 추가
const addUsers = async (newUser) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, newUser);
};

// 회원 정보 불러오기
const getUsers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`);
  return response.data;
};
// 로그인
const login = async (userData) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_LOGIN_URL}/login`,
    userData
  );
  localStorage.setItem(
    "token",
    JSON.stringify({ token: data.token, email: userData.id })
  );
  return data;
};

// 유저 인증 확인
const getUser = async () => {
  const { token } = JSON.parse(localStorage.getItem("token")) ?? {};
  if (token !== undefined) {
    const { data } = await axios.get(
      `${process.env.REACT_APP_LOGIN_URL}/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  }
};

export { signUp, login, getUser, addUsers, getUsers };
