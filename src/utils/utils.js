export const sliceBook = (book) => {
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
};

export const createQuery=({searchString, category, sortBy, startIndex, pagination})=> {
  if (searchString === "") return null;
  let query = `https://www.googleapis.com/books/v1/volumes?q=${searchString}`;
  if ((category !== "all")) query += `+subject:${category}`;
  if (pagination > 0) query += `&maxResults=${pagination}`;
  if (!sortBy) query += `&orderBy=${sortBy}`;
  if (startIndex > 0) query += `&startIndex=${startIndex}`;
  query += `&key=${import.meta.env.VITE_API_key}`;

  return query;
}