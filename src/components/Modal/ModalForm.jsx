import React, { useEffect, useRef } from "react";
import {
  CloseModalSvg,
  CloseModalSvgDiv,
  ModalContent,
  ModalOverlay,
} from "./styles";
const ModalForm = ({ children, closeModal }) => {
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

  return (
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
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalForm;
