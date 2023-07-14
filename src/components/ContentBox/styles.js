import { styled } from "styled-components";

const ContentsBox = styled.div`
  display: flex;
  justify-content: start;
  width: 1200px;
  background-color: ${(props) => props.theme.tertiary};
  overflow: scroll;
  max-height: 1000px;
 padding: 30px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 100%;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: ${(props) => props.theme.primary};
  }
`;
const Content = styled.div`
  font-size: 20px;

`;
const ContentLabel = styled.div`
  font-weight: 700;
  padding: 10px 0 10px 0;
`;
const PostImg = styled.img`
  background-image: url(${(props) => props.src});
  width: 80%;
`;
export { ContentsBox, Content, ContentLabel, PostImg };
