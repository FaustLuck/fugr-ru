import { configureStore } from "@reduxjs/toolkit";
import reducer from "@s/reduser.js";

const store = configureStore({
  reducer
});

export default store;