import React from "react";
import { CreatePost, Post, PostsBox, SelectBox } from "./styles";

const PostList = ({
  setIsOpen,
  isLoading,
  isError,
  data,
  setContentId,
  contentId,
}) => {
  if (isLoading) {
    return <p>로딩중입니다....!</p>;
  }
  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }
  const openModal = () => {
    setIsOpen(true);
  };
  const handleContentBoxLinkClick = (item) => {
    setContentId(item.id);
  };
  return (
    <PostsBox>
      {data.map((item) => {
        return (
          <>
          <Post
            radius={item.id === contentId ? 30 : 50}
            key={item.id}
            src={item.contentsImg}
            onClick={() => handleContentBoxLinkClick(item)}
            >
            {!item.contentsImg && item.title}
          </Post>
              {item.id === contentId&&<SelectBox className="SelectBox"/>}
        </>
        )
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
    
  );
};

export default PostList;
