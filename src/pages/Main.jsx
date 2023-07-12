import { styled } from "styled-components";
import useInput from "../hooks/useInput";
import { useState } from "react";
import PostList from "../components/PostList/PostList";
import PostModal from "../components/Modal/PostModal";
import { useQuery } from "react-query";
import { deletePosts, getPosts } from "../api/posts";
import ContentBox from "../components/ContentBox/ContentBox";
import { useMutation, useQueryClient } from "react-query";
import Button from "../components/Button/Button";
import ModifyModal from "../components/Modal/ModifyModal";

const Main = () => {
  const [title, setTitle] = useInput();
  const [contents, setContents] = useInput();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [contentId, setContentId] = useState("");
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const { isLoading, isError, data } = useQuery("posts", getPosts);
  const queryClient = useQueryClient();
  
  const deleteMutation = useMutation(deletePosts, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
  const deletePost = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(contentId);
      setContentId("");
    } else return;
  };

  const modifyPost = () => {
    if (contentId) setModifyModalOpen(true);
    else return alert("수정하고 싶은 게시물을 선택해 주세요.");
  };

  return (
    <MainBox>
      <FlexBox>
        {/* 게시물 리스트 */}
        <PostList
          setIsOpen={setIsOpen}
          contentId={contentId}
          setContentId={setContentId}
          isLoading={isLoading}
          isError={isError}
          data={data}
        />
        {/* 회원리스트 및 게시물 수정, 삭제 */}
        <UsersBox>
          회원리스트
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <EventButtonDiv>
            <Button onClick={modifyPost}>수정</Button>
            <Button onClick={deletePost}>삭제</Button>
          </EventButtonDiv>
          {/* 게시물 수정 모달창 */}
          <ModifyModal
            contentId={contentId}
            title={title}
            contents={contents}
            previewUrl={previewUrl}
            setTitle={setTitle}
            setContents={setContents}
            setPreviewUrl={setPreviewUrl}
            setIsOpen={setIsOpen}
            data={data}
            modifyModalOpen={modifyModalOpen}
            setModifyModalOpen={setModifyModalOpen}
          />
        </UsersBox>
        {/* 게시물 컨텐츠 영역 */}
        <ContentBox data={data} contentId={contentId} />
        {/* 게시물 작성 모달창 */}
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
const EventButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  background-color: #27282c;
  width: 286px;
  height: 80px;
  bottom: 0;
`;
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
  background-color: ${(props) => props.theme.secondary};
  border-top-left-radius: 10px;
`;

export default Main;
