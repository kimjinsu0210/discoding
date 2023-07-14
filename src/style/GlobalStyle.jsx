import { createGlobalStyle } from "styled-components";

export const theme = {
  primary: "#202225",
  secondary: "#2F3136",
  tertiary: "#36393F",
  skyblue: "#7289da",
};

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
  body {
    background-color: ${theme.primary};
    font-family: 'GmarketSansMedium';
    color: #c2c2c2;
  }
`;
