import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleApiProvider } from 'react-gapi'
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { theme, globalCss } from "./theme"
import { HashRouter } from 'react-router-dom';
import { SettingsContextProvider } from './settingsContext';
import "github-fork-ribbon-css/gh-fork-ribbon.css"

const clientId = window.clientId || process.env.REACT_APP_CLIENTID;


ReactDOM.render(
  <React.StrictMode>
    {process.env.REACT_APP_GITHUB_LINK === "enabled" && (
      <a className="github-fork-ribbon" href="https://github.com/parmus/multimeet" data-ribbon="Fork me on GitHub" title="Fork me on GitHub">Fork me on GitHub</a>
    )}    
    <CssBaseline/>
    <GlobalStyles styles={globalCss}/>
    <ThemeProvider theme={theme}>
      <GoogleApiProvider clientId={clientId}>
        <SettingsContextProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </SettingsContextProvider>
      </GoogleApiProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
