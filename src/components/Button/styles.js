import { styled } from "styled-components";

const StButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#ebebeb" : "#7289da")};
  transition: 0.5s ease;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 10px;
  float: ${(props) => props.float};
  color: #fff;
  cursor: pointer;
  border: none;
  margin: 10px;
`;

export { StButton };
