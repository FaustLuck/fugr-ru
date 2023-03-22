import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "@s/store.js";
import App from "@c/App.jsx";
import Header from "@c/Header/Header.jsx";
import { RouterProvider } from "react-router-dom";
import router from "@r/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Header/>
      <RouterProvider router={router}>
        <App/>
      </RouterProvider>
    </Provider>
  </React.StrictMode>,
);
