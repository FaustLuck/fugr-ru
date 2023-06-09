import { chooseBook } from "@s/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "@c/BookCard/BookCard.scss";


function BookCard(props) {
  const id = props.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = useSelector(state => state.books.find(el => el.id === id));

  function openTheBook() {
    dispatch(chooseBook(id));
    navigate(`/${id}`);
  }

  return (
    <article onClick={openTheBook} className="card">
      <div>
        <img src={book?.smallThumbnail} alt={book?.title}/>
      </div>
      <span className="card__categories">{book?.categories?.[0]}</span>
      <span className="card__title">{book?.title}</span>
      <span className="card__authors">{book?.authors}</span>
    </article>
  );
}

export default BookCard;