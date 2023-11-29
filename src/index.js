import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import i18next from "i18next";

import store from "redux/store";
import "./index.css";
import 'react-step-progress-bar/styles.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import translationDE from "./translations/de-DE.json";
import translationUS from "./translations/en-US.json";
import theme from 'config/theme';

i18next.use(LanguageDetector).init({
  interpolation: { escapeValue: false },
  fallbackLng: 'de',
  defaultNS: 'common',
  resources: {
    en: {
      common: translationUS,
    },
    de: {
      common: translationDE,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
