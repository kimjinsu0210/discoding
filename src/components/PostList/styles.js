import { styled } from "styled-components";

const Post = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  white-space: nowrap;
  margin-bottom: 1rem;
  background-color: #333333;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-image: url(${(props) => props.src});
  transition: border-radius 0.2s ease;
  &:hover {
    border-radius: 35%;
  }
`;

const PostsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 80px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-thumb {
    border: none;
  }
`;

const CreatePost = styled(Post)`
  &:hover {
    background-color: #39ad56;
    & > svg {
      fill: #fff;
    }
  }
`;
export { PostsBox, CreatePost, Post };
