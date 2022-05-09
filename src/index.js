import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './styles/GlobalStyles';
import Router from './Router';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyles />
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </>
);
