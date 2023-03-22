import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./store/store.js";
import Header from "./components/SearchComponent/Header.jsx";
import Content from "./components/ContentComponent/Content.jsx";
import Footer from "./components/Footer/Footer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Header/>
      <Content/>
      <Footer/>
    </Provider>
  </React.StrictMode>,
);
