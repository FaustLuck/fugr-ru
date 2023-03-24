import { createReducer } from "@reduxjs/toolkit";
import { initialState } from "@s/initialState.js";
import { getBooks, clear, chooseBook, saveChoice, updateStartIndex, getBook } from "@s/actions.js";

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
      selected.bookID = payload;
    })
    .addCase(saveChoice, (state, {payload}) => {
      Object.assign(state.selected, payload);
    })
    .addCase(getBook.fulfilled, (state, {payload}) => {
      if (state.books.find(oldBook => oldBook.id === payload.id)) return;
      state.books.push(sliceBook(payload));
      state.loading = false;
    })
    .addCase(getBook.rejected, state => {
      state.loading = false;
      state.totalItems = 0;
    })
    .addCase(getBook.pending, state => {
      state.loading = true;
    })
    .addCase(getBooks.fulfilled, (state, {payload}) => {
      const {totalItems, items} = payload;
      state.fullLoad = (!items);
      if (items) {
        items.forEach(newBook => {
          if (state.books.find(oldBook => oldBook.id === newBook.id)) return;
          state.books.push(sliceBook(newBook));
        });
      }
      if (!state.totalItems) state.totalItems = totalItems;
      state.loading = false;
    })
    .addCase(getBooks.rejected, state => {
      state.loading = false;
      state.totalItems = 0;
    })
    .addCase(getBooks.pending, state => {
      state.loading = true;
    });

});

function sliceBook(book) {
  const {volumeInfo} = book;
  const {imageLinks} = volumeInfo;
  return {
    id: book.id,
    authors: volumeInfo?.authors?.join(", "),
    categories: volumeInfo?.categories,
    description: volumeInfo?.description,
    smallThumbnail: imageLinks?.smallThumbnail,
    thumbnail: imageLinks?.thumbnail,
    title: volumeInfo?.title
  };
}