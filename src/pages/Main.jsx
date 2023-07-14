import { styled } from "styled-components";
import useInput from "../hooks/useInput";
import { useEffect, useState } from "react";
import PostList from "../components/PostList/PostList";
import PostModal from "../components/Modal/PostModal";
import { useQuery } from "react-query";
import { deletePosts, getPosts } from "../api/posts";
import ContentBox from "../components/ContentBox/ContentBox";
import { useMutation, useQueryClient } from "react-query";
import Button from "../components/Button/Button";
import ModifyModal from "../components/Modal/ModifyModal";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../api/users";
import ModalForm from "../components/Modal/ModalForm";

const Main = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useInput();
  const [contents, setContents] = useInput();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [settingOpen, setSettingOpen] = useState(false);
  const [contentId, setContentId] = useState("");
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const { isLoading, isError, data } = useQuery("posts", getPosts);
  const userData = useQuery("users", getUsers).data;
  const queryClient = useQueryClient();
  const localData = JSON.parse(localStorage.getItem("token")) ?? {};
  const token = localData.token;
  const email = localData.email;
  const loginUserData = userData?.filter((e) => e.email === email)[0];

  const deleteMutation = useMutation(deletePosts, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
  const deletePost = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(contentId);
      setSettingOpen(false)
      setContentId("");
    } else return;
  };

  const modifyPost = () => {
    if (contentId) setModifyModalOpen(true);
    else alert("수정하고 싶은 게시물을 선택해 주세요.");
  };
  const signOut = () => {
    if (window.confirm("정말로 로그아웃 하시겠습니까?")) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  useEffect(() => {
    if (!token) {
      alert("로그인을 먼저 진행해 주세요.");
      return navigate("/");
    }
  }, [token]);

  const closeModal = () => {
    setSettingOpen(false);
  };
  return (
    <>
      <Header />
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
          {/* 회원리스트 및 게시물 수정, 삭제, 로그아웃 */}
          <UsersBox radius="10">
            <UserListTitle>회원 리스트</UserListTitle>
            <StHr />
            {userData?.map((user) => {
              return (
                <UserListBox key={user.email}>
                  <UserProfile src={user.profileImg}></UserProfile>
                  <div>{user.nickname}</div>
                </UserListBox>
              );
            })}
            {settingOpen && (
              <ModalForm closeModal={closeModal}>
                {data
                  ?.filter((e) => e.id === contentId && e.uEmail === email)
                  .map((post) => {
                    return (
                      <>
                        <Button onClick={modifyPost} width="70" height="50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="2em"
                            viewBox="0 0 576 512"
                            fill="#dddddd"
                          >
                            <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V285.7l-86.8 86.8c-10.3 10.3-17.5 23.1-21 37.2l-18.7 74.9c-2.3 9.2-1.8 18.8 1.3 27.5H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z" />
                          </svg>
                        </Button>
                        <Button onClick={deletePost} width="70" height="50">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="2em"
                            viewBox="0 0 448 512"
                            fill="#dddddd"
                          >
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                          </svg>
                        </Button>
                      </>
                    );
                  })}
                <Button onClick={signOut} width="70" height="50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="2em"
                    viewBox="0 0 512 512"
                    fill="#dddddd"
                  >
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                  </svg>
                </Button>
              </ModalForm>
            )}
            <UserBar>
              <UserProfile src={loginUserData?.profileImg}></UserProfile>
              <div>
                <div>{loginUserData?.nickname}</div>
              </div>
              <SettingDiv onClick={() => setSettingOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1.3em"
                  viewBox="0 0 512 512"
                  fill="#919191"
                >
                  <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
                </svg>
              </SettingDiv>
            </UserBar>
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
              setSettingOpen={setSettingOpen}
            />
          </UsersBox>
          {/* 게시물 컨텐츠 영역 */}
          <ContentBox
            data={data}
            contentId={contentId}
            loginUserData={loginUserData}
          />
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
            email={email}
            loginUserData={loginUserData}
          />
          <UsersBox>
            <UserListTitle>온라인 - 1</UserListTitle>
            <UserListBox>
              <UserProfile src={loginUserData?.profileImg} />
              <OnlineCheck backgroudcolor="#00ff0d" />
              <div>{loginUserData?.nickname}</div>
            </UserListBox>
            <UserListTitle>오프라인 - {userData?.length - 1}</UserListTitle>
            {userData
              ?.filter((e) => e.email !== email)
              .map((user) => {
                return (
                  <UserListBox key={user.email}>
                    <UserProfile src={user.profileImg} />
                    <OnlineCheck backgroudcolor="#585858" />
                    <div>{user.nickname}</div>
                  </UserListBox>
                );
              })}

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
        </FlexBox>
      </MainBox>
    </>
  );
};
const OnlineCheck = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.backgroudcolor};
  border: 3px solid ${(props) => props.theme.tertiary};
  position: relative;
  right: 21px;
  top: 13px;
`;
const UserBar = styled.div`
  display: flex;
  position: absolute;
  background-color: #27282c;
  width: 286px;
  height: 70px;
  bottom: 0;
  align-items: center;
  font-size: 17px;
`;
const Flex = styled.div`
  display: flex;
`;
const FlexBox = styled(Flex)`
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
  border-top-left-radius: ${(props) => props.radius}px;
`;
const UserProfile = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.src});
  margin: 10px;
`;
const UserListBox = styled(Flex)`
  align-items: center;
`;
const UserListTitle = styled(Flex)`
  justify-content: center;
  margin: 10px;
`;
const StHr = styled.hr`
  background-color: ${(props) => props.theme.primary};
  border: none;
  margin: 10px 0;
  height: 2px;
`;
const SettingDiv = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 17px;
  right: 11px;
`;
export default Main;
