import { useSelector } from "react-redux";
import BookCard from "@c/BookCard/BookCard.jsx";
import '@c/Content/Content.scss'

function Content() {
  const books = useSelector(state => state.books);

  const listBook = books.map(book => {
    return <BookCard key={book.id} book={book}/>;
  });

  return (
    <section className="show">
      {listBook}
    </section>
  );
}

export default Content;