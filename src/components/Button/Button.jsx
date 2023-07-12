import React from "react";
import { styled } from "styled-components";

// Custom Hook을 사용하여 Button 컴포넌트 틀 생성
const Button = ({ children, ...rest }) => {
  // Button 컴포넌트 반환
  return <StButton {...rest}>{children}</StButton>;
};

const StButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#ebebeb" : "#7289da")};
  transition: 0.5s ease;
  width: 90px;
  height: 50px;
  border-radius: 10px;
  float: right;
  color: #fff;
  cursor: pointer;
  border: none;
  margin: 10px;
`;
export default Button;
