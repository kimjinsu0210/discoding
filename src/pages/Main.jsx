import { styled } from "styled-components";
import useInput from "../hooks/useInput";
import { useState } from "react";
import PostList from "../components/PostList/PostList";
import PostModal from "../components/Modal/PostModal";
import { useQuery } from "react-query";
import { getPosts } from "../api/posts";
import ContentBox from "../components/ContentBox/ContentBox";
const Main = () => {
  const [title, setTitle] = useInput();
  const [contents, setContents] = useInput();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [contentId, setContentId] = useState("");
  const { isLoading, isError, data } = useQuery("posts", getPosts);
  return (
      <MainBox>
        <FlexBox>
          {/* 게시글 리스트 */}
          <PostList
            setIsOpen={setIsOpen}
            setContentId={setContentId}
            isLoading={isLoading}
            isError={isError}
            data={data}
          />
          {/* 회원리스트 */}
          <UsersBox>
            회원리스트
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </UsersBox>
          {/* 컨텐츠 */}
          <ContentBox data={data} contentId={contentId} />
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
        </FlexBox>
      </MainBox>
  );
};
const FlexBox = styled.div`
  display: flex;
  height: 900px;
`;
const MainBox = styled.div`
  position: absolute;
  width: 100%;
  height: 900px;
`;

const UsersBox = styled.div`
  width: 15%;
  background-color: #303033;
  border-top-left-radius: 10px;
`;

export default Main;
