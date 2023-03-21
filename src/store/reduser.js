import { createReducer } from "@reduxjs/toolkit";
import { initialState } from "./initialState.js";
import { createQuery, getBooks, updateStartIndex, clear } from "./actions.js";

export default createReducer(initialState, (builder) => {
  builder
    .addCase(createQuery, (state, {payload}) => {
      if (payload.searchString === "") {
        state.query = "";
        return;
      }
      const stringSubject = (payload.selectedCategory === "all") ? "" : `+subject:${payload.selectedCategory}`;
      const pagination = `&maxResults=30`;
      const startIndex = (payload.startIndex) ? `&startIndex=${payload.startIndex}` : "";
      state.query = `https://www.googleapis.com/books/v1/volumes?q=${payload.searchString}${stringSubject}${pagination}&orderBy=${payload.selectedSortBy}${startIndex}&key=${import.meta.env.VITE_API_key}`;
    })
    .addCase(updateStartIndex, (state) => {
      state.startIndex += state.books.length;
    })
    .addCase(clear, (state) => {
      state.books = [];
      state.totalItems = 0;
      state.startIndex = 0;
    })
    .addCase(getBooks.fulfilled, (state, {payload}) => {
      const {totalItems, items} = payload;
      state.books.push(...sliceBook(items));
      state.totalItems = totalItems;
      state.loading = false;
    })
    .addCase(getBooks.rejected, (state) => {
      state.loading = false;
    })
    .addCase(getBooks.pending, (state) => {
      state.loading = true;
    });
});

function sliceBook(books) {
  const output = [];

  for (const book of books) {
    const {volumeInfo} = book;
    const {imageLinks} = volumeInfo;

    output.push({
      id: book.id,
      authors: volumeInfo?.authors,
      categories: volumeInfo?.categories,
      description: volumeInfo?.description,
      smallThumbnail: imageLinks?.smallThumbnail,
      thumbnail: imageLinks?.thumbnail,
      title: volumeInfo?.title
    });
  }
  return output;
}