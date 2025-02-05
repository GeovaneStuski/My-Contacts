import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Sora, sans-serif;
}
body {
  background-Color: ${({ theme }) => theme.colors.background};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray[900]};
}
button {
  cursor: pointer;
}
`;

export default GlobalStyle;
