import { styled } from "styled-components";

const Post = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${(props) => props.radius}%;
  white-space: nowrap;
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.tertiary};
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  background-image: url(${(props) => props.src});
  transition: border-radius 0.2s ease;

  &:hover {
    border-radius: 30%;
  }
`;

const PostsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 85px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-thumb {
    border: none;
  }
`;

const CreatePost = styled(Post)`
  border-radius: 50%;
  &:hover {
    background-color: #39ad56;
    & > svg {
      fill: #fff;
    }
  }
`;
const SelectBox = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 20px;
  width: 10px;
  height: 50px;
  top: 5px;
  right: 78px;
  margin-right: -10px;
`;
export { PostsBox, CreatePost, Post, SelectBox };
