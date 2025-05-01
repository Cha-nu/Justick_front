import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NotoSansKR';
    src: url('/fonts/NotoSansKR-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  * {
    font-family: 'NotoSansKR', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
