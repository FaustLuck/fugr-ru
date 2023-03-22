function BookCard(props) {
  const book = props.book;


  return (
    <article className="card">
      <img src={book.smallThumbnail} alt={book.title}/>
      <span className="card__categories">{book.categories}</span>
      <span className="card__title">{book.title}</span>
      <span className="card__authors">{book.authors}</span>
    </article>
  );
}

export default BookCard;