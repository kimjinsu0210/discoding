import React from "react";
import { Content, ContentLabel, ContentsBox, PostImg } from "./styles";
const ContentBox = ({ data, contentId }) => {
  return (
    <ContentsBox>
      {data
        ?.filter((e) => e.id === contentId)
        .map((item) => {
          return (
            <Content key={item.id}>
              <ContentLabel>{item.date}</ContentLabel>
              <ContentLabel>작성자: {item.nickname}</ContentLabel>
              {item.contentsImg && <PostImg src={item.contentsImg}></PostImg>}
              <ContentLabel>제목</ContentLabel>
              <div>{item.title}</div>
              <ContentLabel>내용</ContentLabel>
              <div>{item.contents}</div>
            </Content>
          );
        })}
    </ContentsBox>
  );
};

export default ContentBox;
