import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { Provider } from "react-redux";
import store from "@s/store.js";
import { RouterProvider } from "react-router-dom";
import router from "@r/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
);
