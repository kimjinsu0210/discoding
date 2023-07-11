import { useMutation, useQuery, useQueryClient } from "react-query";
import { keyframes, styled } from "styled-components";
import { getPosts } from "../api/posts";
import useInput from "../hooks/useInput";
import { useEffect, useRef, useState } from "react";
import { addPosts } from "../api/posts";
import uuid from "react-uuid";

const Main = () => {
  const { isLoading, isError, data } = useQuery("posts", getPosts);
  const [title, setTitle] = useInput();
  const [contents, setContents] = useInput();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();

  const clickOutside = (event) => {
      if (modalRef.current === event.target) {
        closeModal();
      }
    };
    useEffect(() => {
      document.addEventListener("mousedown", clickOutside);
      return () => {
        document.removeEventListener("mousedown", clickOutside);
      };
    }, []);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setTitle("");
    setContents("");
    setPreviewUrl("");
  };


  const queryClient = useQueryClient();
  const mutation = useMutation(addPosts, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      console.log("성공하셨습니다.");
    },
  });

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();
    const date = new Date();
    const nowTime = date.toLocaleString();

    if (!title || !contents) {
      return alert("제목 또는 내용이 없습니다.");
    }
    const newPost = {
      id: uuid(),
      title,
      contents,
      contentsImg: previewUrl,
      date: nowTime,
    };

    mutation.mutate(newPost);
    setIsOpen(false);
    setTitle("");
    setContents("");
    setPreviewUrl(null);
  };

  // 파일 미리 보기 기능
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // FileReader 객체를 생성하여 파일을 읽습니다.
    const reader = new FileReader();
    reader.onload = () => {
      // 파일을 읽고, 읽은 데이터를 이미지 URL로 변환하여 상태에 저장합니다.
      setPreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <p>로딩중입니다....!</p>;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  return (
    <MainDiv>
      {/* 게시글 박스 */}
      <PostsBox>
        {data.map((item) => {
          return (
            <Post key={item.id} src={item.contentsImg}>
              {!item.contentsImg && item.title}
            </Post>
          );
        })}
        <CreatePost onClick={openModal}>
          <svg
            fill="#39ad56"
            xmlns="http://www.w3.org/2000/svg"
            height="1.3em"
            viewBox="0 0 448 512"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </CreatePost>
      </PostsBox>
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
        {isOpen && (
          <ModalOverlay ref={modalRef}>
            <ModalContent >
              <CloseModalSvgDiv onClick={closeModal}>
                <CloseModalSvg
                  fontSize="30px"
                  fill="#969696"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                >
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </CloseModalSvg>
              </CloseModalSvgDiv>
              <form onSubmit={handleSubmitButtonClick}>
                <StLabel>제목</StLabel>
                <StInput
                  type="text"
                  value={title}
                  onChange={setTitle}
                  autoFocus
                />
                <StLabel>내용</StLabel>
                <StInput type="text" value={contents} onChange={setContents} />
                <StLabel>사진</StLabel>
                <StInput type="file" onChange={handleFileChange} />
                {previewUrl && (
                  <>
                    <StLabel>사진미리보기</StLabel>
                  <PreviewImgDiv>
                    <PreviewImg
                      src={previewUrl}
                      alt="Preview"
                    />
                  </PreviewImgDiv>
                  </>
                )}
                <SubmitButton type="submit">만들기</SubmitButton>
              </form>
            </ModalContent>
          </ModalOverlay>
        )}
      </ContentsBox>
    </MainDiv>
  );
};

const StLabel = styled.h2`
  margin: 10px;
  font-size: 13px;
  color: #000;
`;

const StInput = styled.input`
  border: none;
  outline: none;
  width: 95%;
  font-size: 15px;
  padding: 8px;
  border-bottom: 1px solid #ebebeb;
  &:focus {
    border-bottom: 2px solid #000;
  }
  &:focus::placeholder {
    color: transparent;
  }
`;
const PreviewImg = styled.img`
  max-width: 100%;
  margin-top: 10px;
`;
const PreviewImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  `;

  const fadeIn = keyframes`
    from {
      opacity: 0;
      transform: translateY(-50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);

`;
const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 400px;
  border-radius: 12px;
  animation: ${fadeIn} 0.3s;
`;


const CloseModalSvg = styled.svg`
  cursor: pointer;
  &:hover {
    transition: 0.7s ease;
    fill: #242424;
  }
`;
const CloseModalSvgDiv = styled.div`
  float: right;
`;

const SubmitButton = styled.button`
  background-color: #7289da;
  width: 90px;
  height: 50px;
  border-radius: 10px;
  float: right;
  color: #fff;
  cursor: pointer;
  border: none;
  margin: 10px;
`;

const MainDiv = styled.div`
  display: flex;
`;
const PostsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 5%;
`;
const Post = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
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
const CreatePost = styled(Post)`
  &:hover {
    background-color: #39ad56;
    & > svg {
      fill: #fff;
    }
  }
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
