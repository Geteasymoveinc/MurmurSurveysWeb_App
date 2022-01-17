import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { Provider } from "react-redux";

import store from "./store";

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
serviceWorker.register({
  short_name: "autocustos",
  name: "Calculadora dos Custos do Automóvel",
  start_url: "/PT",
  scope: "/",
  background_color: "#F4F6FE",
  display: "fullscreen",
  theme_color: "#F4F6FE",
});
