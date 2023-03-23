export const initialState = {
  books: [],
  totalItems: null,
  loading: false,
  selected: {
    startIndex: 0,
    bookID: null,
    category: null,
    sortBy: null,
    searchString: "",
    pagination: 30
  }
};