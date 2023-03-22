import { chooseBook } from "@s/actions.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "@c/BookCard/BookCard.scss";


function BookCard(props) {
  const book = props.book;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function openTheBook() {
    dispatch(chooseBook(book));
    navigate(`/${book.id}`);
  }

  return (
    <article onClick={openTheBook} className="card">
      <div>
        <img src={book.smallThumbnail} alt={book.title}/>
      </div>
      <span className="card__categories">{book.categories}</span>
      <span className="card__title">{book.title}</span>
      <span className="card__authors">{book.authors}</span>
    </article>
  );
}

export default BookCard;