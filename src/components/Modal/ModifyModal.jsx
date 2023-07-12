import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { modifyPosts } from "../../api/posts";
import ModalForm from "./ModalForm";
import { PreviewImg, PreviewImgDiv, StInput, StLabel } from "./styles";
import Button from "../Button/Button";

const ModifyModal = ({
  contentId,
  title,
  contents,
  previewUrl,
  setTitle,
  setContents,
  setPreviewUrl,
  setIsOpen,
  data,
  modifyModalOpen,
  setModifyModalOpen,
}) => {
  const queryClient = useQueryClient();
  const modifyMutation = useMutation(modifyPosts, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });
  const closeModal = () => {
    setModifyModalOpen(false);
    setTitle("");
    setContents("");
    setPreviewUrl(null);
  };

  const handleSubmitButtonClick = (event) => {
    event.preventDefault();
    const date = new Date();
    const nowTime = date.toLocaleString();

    if (title.length > 30 || contents.length > 100) {
      return alert("제목은 30자, 내용은 100자 이하로 작성해 주세요.");
    }
    const changePost = {
      title,
      contents,
      contentsImg: previewUrl,
      date: nowTime,
    };
    modifyMutation.mutate({ contentId, changePost });
    setIsOpen(false);
    setTitle("");
    setContents("");
    setPreviewUrl(null);
    setModifyModalOpen(false);
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
      {modifyModalOpen &&
        data
          ?.filter((e) => e.id === contentId)
          .map((item) => {
            return (
              <ModalForm closeModal={closeModal}>
                <form onSubmit={handleSubmitButtonClick}>
                  <StLabel>제목</StLabel>
                  <StInput
                    type="text"
                    value={title}
                    onChange={setTitle}
                    autoFocus
                  />
                  <StLabel>내용</StLabel>
                  <StInput
                    type="text"
                    value={contents}
                    onChange={setContents}
                  />
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
                  <Button
                    type="submit"
                    disabled={title && contents ? false : true}
                  >
                    수정하기
                  </Button>
                </form>
              </ModalForm>
            );
          })}
    </>
  );
};

export default ModifyModal;
