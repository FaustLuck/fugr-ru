import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const createQuery = createAction("createQuery");
export const updateStartIndex = createAction("updateStartIndex");
export const clear = createAction("clear");
export const getBooks = createAsyncThunk(
  "getBooks",
  async (payload = null, thunkAPI) => {
    const {query} = thunkAPI.getState();
    const res = await fetch(query);
    return await res.json();
  }
);