import "@c/Footer/Footer.scss";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, updateStartIndex } from "@s/actions.js";

function Footer() {
  const dispatch = useDispatch();
  const fullLoad = useSelector(state => state.fullLoad);

  function loadMore() {
    dispatch(updateStartIndex());
    dispatch(getBooks());
  }

  return (
    <footer>
      <input type="button" value="Загрузить еще" disabled={fullLoad!==false} onClick={loadMore}/>
    </footer>
  );
}

export default Footer;