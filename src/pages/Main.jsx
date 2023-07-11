import { styled } from "styled-components";
import useInput from "../hooks/useInput";
import { useState } from "react";
import PostList from "../components/PostList/PostList";
import PostModal from "../components/Modal/PostModal";
const Main = () => {
  // const { isLoading, isError, data } = useQuery("posts", getPosts);
  const [title, setTitle] = useInput();
  const [contents, setContents] = useInput();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MainDiv>
      {/* 게시글 리스트 */}
      <PostList setIsOpen={setIsOpen} />
      {/* 회원리스트 */}
      <UsersBox>
        회원리스트
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </UsersBox>
      {/* 컨텐츠 */}
      <ContentsBox>
        컨텐츠
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </ContentsBox>
      {/* 모달창 */}
      <PostModal
        title={title}
        setTitle={setTitle}
        contents={contents}
        setContents={setContents}
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </MainDiv>
  );
};

const MainDiv = styled.div`
  display: flex;
`;

const UsersBox = styled.div`
  width: 15%;
  background-color: #2c2c2c;
  border-top-left-radius: 10px;
  height: 900px;
`;
const ContentsBox = styled.div`
  width: 80%;
  background-color: #333333;
`;
export default Main;
