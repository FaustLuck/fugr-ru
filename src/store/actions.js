import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const updateStartIndex = createAction("updateStartIndex");
export const clear = createAction("clear");
export const chooseBook = createAction("chooseBook");
export const getBooks = createAsyncThunk(
  "getBooks",
  async (payload = null, {rejectWithValue}) => {
    const query = createQuery(payload);
    if (!query) return rejectWithValue();
    const res = await fetch(query);
    return await res.json();
  }
);

function createQuery({searchString, selectedCategory, selectedSortBy, startIndex}) {
  if (searchString === "") return null;
  const stringSubject = (selectedCategory === "all") ? "" : `+subject:${selectedCategory}`;
  const pagination = `&maxResults=30`;
  const startIndexString = (startIndex) ? `&startIndex=${startIndex}` : "";
  return `https://www.googleapis.com/books/v1/volumes?q=${searchString}${stringSubject}${pagination}&orderBy=${selectedSortBy}${startIndexString}&key=${import.meta.env.VITE_API_key}`;

}