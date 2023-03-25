import { useState } from "react";
import List from "@c/List/List.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getBooks, saveChoice } from "@s/actions.js";
import "@c/Header/Header.scss";
import { useNavigate } from "react-router-dom";
import imgURL from "@a/glass.svg";
import Counter from "@c/Counter/Counter.jsx";

function Header() {
  const categoriesList = [
    {all: "Все категории"},
    {art: "Искусство"},
    {biography: "Биография"},
    {computers: "Компьютер"},
    {history: "История"},
    {medical: "Медицина"},
    {poetry: "Поэзия"}
  ];
  const sortByList = [
    {relevance: "релевантности"},
    {newest: "новизне"}
  ];
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [searchString, setSearchString] = useState("");
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function sendQuery(e) {
    if (e.type === "keydown" && e.code !== "NumpadEnter" && e.code !== "Enter") return;
    e.preventDefault();
    navigate("/");
    dispatch(saveChoice({category, sortBy, searchString}));
    dispatch(getBooks());
  }

  return (
    <header>
      <form>
        <h1>Поиск книг</h1>
        <div className="search">
          <input placeholder="Поиск..." type="text"
                 disabled={loading === true}
                 className="search__input"
                 onChange={(e) => setSearchString(e.target.value)}
                 onKeyDown={sendQuery}
          ></input>
          <img className={loading ? "disabled" : ""} src={imgURL} alt="Искать" title="Искать" onClick={sendQuery}/>
        </div>
        <div>
          <label>
            Категория:
            <List key={"categories"} list={categoriesList}
                  handleChange={((value) => setCategory(value))}></List>
          </label>
          <label>
            Сортировать по
            <List key={"order"} list={sortByList}
                  handleChange={((value) => setSortBy(value))}></List>
          </label>
        </div>
        <Counter/>
      </form>
    </header>
  );
}

export default Header;