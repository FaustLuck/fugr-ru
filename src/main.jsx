import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import store from "@s/store.js";
import Header from "@c/HeaderComponent/Header.jsx";
import Content from "@c/ContentComponent/Content.jsx";
import Footer from "@c/Footer/Footer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Header/>
      <Content/>
      <Footer/>
    </Provider>
  </React.StrictMode>,
);
