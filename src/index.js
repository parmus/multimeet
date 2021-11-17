import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleApiProvider } from 'react-gapi'
import { clientId } from './settings';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { theme, globalCss } from "./theme"


ReactDOM.render(
  <React.StrictMode>
    <CssBaseline/>
    <GlobalStyles styles={globalCss}/>
    <ThemeProvider theme={theme}>
      <GoogleApiProvider clientId={clientId}>
        <App />
      </GoogleApiProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
