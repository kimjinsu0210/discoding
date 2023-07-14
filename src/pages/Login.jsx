import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Button from "../components/Button/Button";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import ModalForm from "../components/Modal/ModalForm";
import { PreviewImg, PreviewImgDiv } from "../components/Modal/styles";
import { addUsers, login, signUp } from "../api/users";
import uuid from "react-uuid";

const Login = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [joinId, setJoinId] = useState("");
  const [joinPassword, setJoinPassword] = useState("");
  const [joinNickname, setJoinNickname] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [checkId, setCheckId] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkNickname, setCheckNickname] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const localData = JSON.parse(localStorage.getItem("token")) ?? {};
  const token = localData.token;
  useEffect(() => {
    if (token) {
      navigate("/main");
      alert("로그인 페이지로 이동하려면 로그아웃을 진행해 주세요.");
    }
  }, [token]);

  const signUpModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setJoinId("");
    setJoinPassword("");
    setJoinNickname("");
    setPreviewUrl("");
    setCheckId("");
    setCheckPassword("");
    setCheckNickname("");
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;

  // 이메일 유효성 검사
  const emailCheck = (event) => {
    setCheckId(emailRegEx.test(event));
  };
  // 비밀번호 유효성 검사
  const passwordCheck = (password) => {
    setCheckPassword(passwordRegEx.test(password));
  };
  // 닉네임 유효성 검사
  const nicknameCheck = (nickname) => {
    setCheckNickname(nickname.length >= 2 && nickname.length <= 16);
  };
  const queryClient = useQueryClient();

  const signUpMutation = useMutation(signUp, {
    onSuccess: () => {
      const date = new Date();
      const nowTime = date.toLocaleString();
      const newUser = {
        id: uuid(),
        email: joinId,
        nickname: joinNickname,
        profileImg: previewUrl ? previewUrl : "defaultImg.png",
        date: nowTime,
      };
      addUserMutation.mutate(newUser);
      return alert("회원가입이 정상적으로 처리 되었습니다.");
    },
    onError: (error) => {
      return alert(error.response.data.message);
    },
  });

  const loginMutation = useMutation(login, {
    onSuccess: () => {
      navigate("/main");
    },
    onError: (error) => {
      return alert(error.response.data.message);
    },
  });

  const addUserMutation = useMutation(addUsers, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const clickEventSignUp = async () => {
    if (typeof joinId !== "string" || typeof joinPassword !== "string")
      return alert("id 또는 password가 string이 아닙니다.");

    signUpMutation.mutate({
      id: joinId,
      password: joinPassword,
    });
    closeModal();
  };
  const clickEventLogin = () => {
    if (!id || !password) return alert("id 또는 password가 존재하지 않습니다.");
    else if (typeof id !== "string" || typeof password !== "string")
      return alert("id 또는 password가 string이 아닙니다.");
    loginMutation.mutate({ id, password });
  };
  return (
    <Body>
      <LoginDiv>
        <Logo>Discoding</Logo>
        <StLabel>아이디</StLabel>
        <StInput
          type="text"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
            emailCheck(e.target.value);
          }}
          autoFocus
        />
        <StLabel>비밀번호</StLabel>
        <StInput
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            passwordCheck(e.target.value);
          }}
        />
        계정이 필요한가요?
        <SignUpATag onClick={signUpModal}>가입하기</SignUpATag>
        {isOpen && (
          <ModalForm closeModal={closeModal} backgroundColor="#2F3136">
            <FlexBox>
              <div>
                <StLabel>아이디</StLabel>
                <StJoinInput
                  type="text"
                  placeholder="예) discoding@discoding.com"
                  value={joinId}
                  onChange={(e) => {
                    setJoinId(e.target.value);
                    emailCheck(e.target.value);
                  }}
                  autoFocus
                />
                {checkId ? (
                  <StP style={checkTrueColor}>사용 가능한 이메일입니다.</StP>
                ) : joinId !== "" ? (
                  <StP>이메일 주소를 정확히 입력해주세요.</StP>
                ) : (
                  <StP>
                    <br />
                  </StP>
                )}
                <StLabel>비밀번호</StLabel>
                <StJoinInput
                  type="password"
                  placeholder="영문, 숫자, 특수문자 조합 8-16자"
                  value={joinPassword}
                  onChange={(e) => {
                    setJoinPassword(e.target.value);
                    passwordCheck(e.target.value);
                  }}
                />
                {checkPassword ? (
                  <StP style={checkTrueColor}>사용 가능한 비밀번호입니다.</StP>
                ) : joinPassword !== "" ? (
                  <StP>
                    영문, 숫자, 특수문자를 조합하여 8-16자 로 입력해주세요.
                  </StP>
                ) : (
                  <StP>
                    <br />
                  </StP>
                )}
                <StLabel>닉네임</StLabel>
                <StJoinInput
                  type="text"
                  value={joinNickname}
                  placeholder="2자 이상 16자 이하 입력"
                  onChange={(e) => {
                    setJoinNickname(e.target.value);
                    nicknameCheck(e.target.value);
                  }}
                />
                {checkNickname === true ? (
                  <StP style={checkTrueColor}>사용 가능한 닉네임입니다.</StP>
                ) : joinNickname !== "" ? (
                  <StP>2자 이상 16자 내로 입력해 주세요.</StP>
                ) : (
                  <StP>
                    <br />
                  </StP>
                )}
                <StLabel>프로필 사진 선택</StLabel>
                <StJoinInput type="file" onChange={handleFileChange} />
              </div>
              {previewUrl && (
                <PreviewDiv>
                  <StLabel>프로필 미리보기</StLabel>
                  <PreviewImgDiv>
                    <PreviewImg src={previewUrl} alt="Preview" />
                  </PreviewImgDiv>
                </PreviewDiv>
              )}
            </FlexBox>
            <Button
              onClick={clickEventSignUp}
              width="100"
              height="50"
              disabled={checkId && checkPassword ? false : true}
              float="right"
            >
              회원가입
            </Button>
          </ModalForm>
        )}
        <Button onClick={clickEventLogin} width="100" height="50" float="right">
          로그인
        </Button>
      </LoginDiv>
    </Body>
  );
};
const Body = styled.div`
  height: 937px;
  background-image: url("/Login-Page-Img.png");
`;
const LoginDiv = styled.div`
  position: absolute;
  top: 245px;
  left: 560px;
  width: 800px;
  height: 450px;
  background-color: ${(props) => props.theme.secondary};
  border-radius: 5px;
  padding: 30px;
`;
const StLabel = styled.h2`
  margin: 10px;
  font-size: 13px;
`;
const StInput = styled.input`
  border: none;
  outline: none;
  width: 97%;
  font-size: 25px;
  padding: 8px;
  background-color: ${(props) => props.theme.primary};
  color: #fff;
  margin-bottom: 30px;
`;
const StJoinInput = styled(StInput)`
  margin: 0;
  font-size: 20px;
`;
const Logo = styled.div`
  font-size: 50px;
  margin: 20px 0 60px 0;
  font-weight: 700;
`;
const StP = styled.h2`
  margin: 8px;
  font-size: 13px;
  color: red;
`;
const checkTrueColor = {
  color: "#14aaff",
};
const SignUpATag = styled.a`
  cursor: pointer;
  margin-left: 5px;
  text-decoration: none;
  color: #14aaff;
  &:hover {
    text-decoration: underline;
  }
`;
const FlexBox = styled.div`
  display: flex;
`;
const PreviewDiv = styled.div`
  margin-left: 50px;
`;
export default Login;
