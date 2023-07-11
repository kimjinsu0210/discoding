import {
  CloseModalSvg,
  CloseModalSvgDiv,
  ModalContent,
  ModalOverlay,
  PreviewImg,
  PreviewImgDiv,
  StInput,
  StLabel,
  SubmitButton,
} from "./styles";
import React, { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "react-query";
import { addPosts } from "../../api/posts";
import uuid from "react-uuid";

const Modal = ({
  title,
  setTitle,
  contents,
  setContents,
  previewUrl,
  setPreviewUrl,
  isOpen,
  setIsOpen,
}) => {
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
      return alert("제목과 내용을 전부 입력해 주세요.");
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

  return (
    <>
      {isOpen && (
        <ModalOverlay ref={modalRef}>
          <ModalContent>
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
                    <PreviewImg src={previewUrl} alt="Preview" />
                  </PreviewImgDiv>
                </>
              )}
              <SubmitButton type="submit">만들기</SubmitButton>
            </form>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Modal;
