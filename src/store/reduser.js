import { createReducer } from "@reduxjs/toolkit";
import { initialState } from "@s/initialState.js";
import { getBooks, updateStartIndex, clear, chooseBook } from "@s/actions.js";

export default createReducer(initialState, (builder) => {
  builder
    .addCase(updateStartIndex, (state) => {
      state.startIndex += state.books.length;
    })
    .addCase(clear, (state) => {
      state.books = [];
      state.totalItems = 0;
      state.startIndex = 0;
    })
    .addCase(chooseBook, (state, {payload}) => {
      const {id} = payload;
      state.selectedBookId = id;
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
      authors: volumeInfo?.authors?.join(", "),
      categories: volumeInfo?.categories?.join("/ "),
      description: volumeInfo?.description,
      smallThumbnail: imageLinks?.smallThumbnail,
      thumbnail: imageLinks?.thumbnail,
      title: volumeInfo?.title
    });
  }
  return output;
}