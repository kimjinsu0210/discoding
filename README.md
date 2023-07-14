## [디스코딩]

리액트를 기반으로 한 코드 공유 웹 페이지 입니다.<br>
코딩 관련 게시물을 저장 및 공유하며 유저들과 소통하고 지식의 폭을 넓힐 수 있습니다.<br>
테마는 현재 상용화중인 '디스코드' 를 참고하여 만들었습니다.<br>

---

## 기능 구현
1. 로그인, 회원가입, 로그아웃 -> mock 서버 이용<br>
2. 게시물 작성, 수정, 삭제 -> 수정 및 삭제는 게시물을 작성한 사람만 가능하게 구현
3. 게시물 상세보기
4. 가입된 회원 및 게시물 리스트 업


## How To Use

```
# node_module 다운로드
$ yarn

# json-server 시작
$ yarn json-server --watch db.json --port 4000

# 프로젝트 시작
$ yarn start
```

---

## 프로젝트 구조

📦src<br>
┣ 📂components&emsp; <br>
┃ ┣ 📂Button<br>
┃ ┃ ┣ 📜Button.jsx&emsp; 👉 공통 버튼 컴포넌트<br>
┃ ┃ ┗ 📜styles.js<br>
┃ ┣ 📂ContentBox<br>
┃ ┃ ┣ 📜ContentBox.jsx&emsp; 👉 게시글 상세보기 페이지<br>
┃ ┃ ┗ 📜styles.js<br>
┃ ┣ 📂Header<br>
┃ ┃ ┣ 📜Header.jsx&emsp; 👉 헤더영역<br>
┃ ┃ ┗ 📜styles.js<br>
┃ ┣ 📂Modal<br>
┃ ┃ ┣ 📜ModalForm.jsx&emsp; 👉 공통 모달 컴포넌트<br>
┃ ┃ ┣ 📜ModifyModal.jsx&emsp; 👉 게시글 수정 모달창<br>
┃ ┃ ┣ 📜PostModal.jsx&emsp; 👉 게시글 작성 모달창<br>
┃ ┃ ┗ 📜styles.js<br>
┃ ┗ 📂PostList<br>
┃   ┣ 📜PostList.jsx&emsp; 👉 게시글 리스트 컴포넌트<br>
┃   ┗ 📜styles.js<br>
┣ 📂hooks&emsp;<br>
┃ ┗ 📜useInput.jsx<br> 👉 useInput 훅<br>
┣ 📂pages<br>
┃ ┃ 📜Login.jsx<br> 👉 로그인 페이지<br>
┃ ┗ 📜Main.jsx<br> 👉 메인 페이지<br>
┣ 📂shared<br>
┃ ┗ 📜Router.js<br> 👉 라우터<br>
┣ 📂style<br>
┗ ┗📜GlobalStyle.jsx<br> 👉 글로벌 스타일 및 테마<br>

---

## 커밋 컨벤션

- Feat : 새로운 기능 추가
- Fix : 버그 수정
- Docs : 문서 변경
- Style : 코드 포맷팅 등 스타일 관련 변경
- Refactor : 코드 리팩토링
- Chore : 설정 변경 등의 기타 변경사항
- Design : CSS 등 사용자 UI 디자인 변경
- Rename : 파일 또는 폴더 명을 수정하거나 옮기는 작업
- Resolve: 병합시 충돌 해결
