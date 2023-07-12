import { keyframes, styled } from "styled-components";

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



export {
  StLabel,
  StInput,
  PreviewImg,
  CloseModalSvgDiv,
  CloseModalSvg,
  ModalContent,
  ModalOverlay,
  PreviewImgDiv,
};
