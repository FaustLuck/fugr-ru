import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const updateStartIndex = createAction("updateStartIndex");
export const clear = createAction("clear");
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

function createQuery({searchString, category, sortBy, startIndex, pagination}) {
  if (searchString === "") return null;
  let query = `https://www.googleapis.com/books/v1/volumes?q=${searchString}`;

  if ((category !== "all")) query += `+subject:${category}`;
  if (pagination > 0) query += `&maxResults=${pagination}`;
  if (sortBy !== "") query += `&orderBy=${sortBy}`;
  if (startIndex > 0) query += `&startIndex=${startIndex}`;
  query += `&key=${import.meta.env.VITE_API_key}`;

  return query;
}