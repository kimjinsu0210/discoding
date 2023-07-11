import { styled } from "styled-components";

const ContentsBox = styled.div`
  display: flex;
  justify-content: center;
  width: 1550px;
  background-color: #3f3f46;
  overflow: scroll;
  max-height: 1000px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 100%;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: #1f2022;
  }
`;
const Content = styled.div`
  font-size: 25px;
  width: 35%;
`;
const ContentLabel = styled.div`
  padding: 20px 0 20px 0;
`;
const PostImg = styled.img`
  background-image: url(${(props) => props.src});
  width: 100%;
`;
export { ContentsBox, Content, ContentLabel, PostImg };
