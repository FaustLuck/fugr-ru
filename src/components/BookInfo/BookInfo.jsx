import { useParams } from "react-router-dom";
import "@c/BookInfo/BookInfo.scss";
import { useDispatch, useSelector } from "react-redux";
import { chooseBook, getBook } from "@s/actions.js";
import Loader from "@c/Loader/Loader.jsx";

function BookInfo() {
  const {id} = useParams();
  const book = useSelector(state => state.books.find(el => el.id === id));
  const dispatch = useDispatch();

  if (!book) {
    dispatch(chooseBook(id));
    dispatch(getBook());
    return (
      <section className="info">
        <Loader/>
      </section>
    );
  }
  return (
    <section className="info">
      <div className="info__thumbnail">
        <picture>
          <source
            media="(max-width: 480px)"
            srcSet={book?.smallThumbnail}
          />
          <img src={book?.thumbnail} alt={book?.title}/>
        </picture>
      </div>
      <div className="info__detail detail">
        <span className="detail__categories">{book.categories.join('/ ')}</span>
        <h2>{book.title}</h2>
        <span className="detail__authors">{book.authors}</span>
        <p>{book.description}</p>
      </div>
    </section>
  );
}

export default BookInfo;