import { useSelector } from "react-redux";
import BookCard from "@c/BookCard/BookCard.jsx";
import "@c/Content/Content.scss";
import Loader from "@c/Loader/Loader.jsx";

function Content() {
  const books = useSelector(state => state.books);

  const listBook = books.map(book => {
    return <BookCard key={book.id} book={book}/>;
  });

  return (
    <section className="show">
      {listBook}
      <Loader/>
    </section>
  );
}

export default Content;