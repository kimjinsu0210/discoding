import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import { useQuery } from "react-query";
import { getUser } from "../api/users";

const Router = () => {
  const data = useQuery("user", getUser, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  if (data.isLoading) {
    return <div>로딩중입니다...</div>;
  }
  if (data.isError) {
    const error = data.error.response.data.message;
    alert(error);
    if (error) localStorage.removeItem("token");
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
