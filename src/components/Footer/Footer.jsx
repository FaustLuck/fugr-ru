import "@c/Footer/Footer.scss";
import { useDispatch } from "react-redux";
import { getBooks, updateStartIndex } from "@s/actions.js";

function Footer() {
  const dispatch = useDispatch();

  function loadMore() {
    dispatch(updateStartIndex());
    dispatch(getBooks());
  }

  return (
    <footer>
      <input type="button" value="Загрузить еще" onClick={loadMore}/>
    </footer>
  );
}

export default Footer;