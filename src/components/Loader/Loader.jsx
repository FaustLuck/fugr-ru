import { useSelector } from "react-redux";
import "@c/Loader/Loader.scss";

function Loader() {
  const loading = useSelector(state => state.loading);
  if (!loading) return (<></>);
  return (
    <div className="book__wrapper">
      <div className="book">
        <div className="page static left"></div>
        <div className="page scrollable"></div>
        <div className="page static right"></div>
      </div>
    </div>
  );
}

export default Loader;