import { createReducer } from "@reduxjs/toolkit";
import { initialState } from "@s/initialState.js";
import { getBooks, clear, chooseBook, saveChoice, updateStartIndex } from "@s/actions.js";

export default createReducer(initialState, (builder) => {
  builder
    .addCase(updateStartIndex, (state) => {
      state.selected.startIndex = (state.selected.startIndex + state.selected.pagination > state.totalItems)
        ? state.totalItems
        : state.selected.startIndex + state.selected.pagination;
    })
    .addCase(clear, (state) => {
      state.books = [];
      state.totalItems = null;
      state.selected.startIndex = 0;
      state.selected.pagination = 30;
    })
    .addCase(chooseBook, ({selected}, {payload}) => {
      const {id} = payload;
      selected.bookID = id;
    })
    .addCase(saveChoice, (state, {payload}) => {
      Object.assign(state.selected, payload);
    })
    .addCase(getBooks.fulfilled, (state, {payload}) => {
      const {totalItems, items} = payload;
      state.books = sliceBooks(state.books, items);
      if (!state.totalItems) state.totalItems = totalItems;
      state.loading = false;
    })
    .addCase(getBooks.rejected, (state) => {
      state.loading = false;
    })
    .addCase(getBooks.pending, (state) => {
      state.loading = true;
    });

});

function sliceBooks(stateBooks, newBooks) {

  for (const book of newBooks) {
    if (stateBooks.find(el => el.id === book.id)) continue;
    const {volumeInfo} = book;
    const {imageLinks} = volumeInfo;

    stateBooks.push({
      id: book.id,
      authors: volumeInfo?.authors?.join(", "),
      categories: volumeInfo?.categories?.join("/ "),
      description: volumeInfo?.description,
      smallThumbnail: imageLinks?.smallThumbnail,
      thumbnail: imageLinks?.thumbnail,
      title: volumeInfo?.title
    });
  }
  return stateBooks;
}