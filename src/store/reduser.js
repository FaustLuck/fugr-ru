import { createReducer } from "@reduxjs/toolkit";
import { initialState } from "@s/initialState.js";
import { getBooks, clear, chooseBook, saveChoice, updateStartIndex } from "@s/actions.js";

export default createReducer(initialState, (builder) => {
  builder
    .addCase(updateStartIndex, ({totalItems, selected}) => {
      selected.startIndex = (selected.startIndex + selected.pagination > totalItems)
        ? totalItems
        : selected.startIndex + selected.pagination;
      if (selected.pagination + selected.startIndex > totalItems) selected.pagination = totalItems - selected.startIndex;
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
      state.fullLoad = (!items);
      if (items) state.books = sliceBooks(state.books, items);
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