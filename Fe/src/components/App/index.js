import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '../../assets/styles/GlobalStyles';
import theme from '../../assets/styles/themes/default';

import { Container } from './styles';

import Router from '../../Router';

import Header from '../Header';
import ToastContainer from '../Toast/ToastContainer';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Container>
          <ToastContainer />
          <Header />
          <Router />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}
