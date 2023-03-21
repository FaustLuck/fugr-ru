import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reduser.js";

const store = configureStore({
  reducer
});

export default store;