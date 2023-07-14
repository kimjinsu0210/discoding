import React from "react";
import { StButton } from "./styles";

// Custom Hook을 사용하여 Button 컴포넌트 틀 생성
const Button = ({ children, ...rest }) => {
  // Button 컴포넌트 반환
  return <StButton {...rest}>{children}</StButton>;
};

export default Button;
