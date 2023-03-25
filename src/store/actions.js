import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createQuery } from "@u/utils.js";

export const updateStartIndex = createAction("updateStartIndex");
export const chooseBook = createAction("chooseBook");
export const saveChoice = createAction("saveChoice");
export const getBook = createAsyncThunk(
  "getBook",
  async (_, {rejectWithValue, getState}) => {
    const {selected} = getState();
    const query = `https://www.googleapis.com/books/v1/volumes/${selected.bookID}`;
    const res = await fetch(query);
    if (res.ok) {
      return await res.json();
    } else {
      return rejectWithValue();
    }
  }
);
export const getBooks = createAsyncThunk(
  "getBooks",
  async (_, {rejectWithValue, getState}) => {
    const {selected} = getState();
    const query = createQuery(selected);
    if (!query) return rejectWithValue();
    const res = await fetch(query);
    if (res.ok) {
      return await res.json();
    } else {
      return rejectWithValue();
    }

  }
);

