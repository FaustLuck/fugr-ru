import { useState } from "react";
import List from "@c/List/List.jsx";
import { useDispatch } from "react-redux";
import { getBooks, clear, saveChoice } from "@s/actions.js";
import "@c/Header/Header.scss";
import { useNavigate } from "react-router-dom";
import imgURL from "@a/glass.svg";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function sendQuery(e) {
    if (e.type === "keydown" && e.code !== "NumpadEnter" && e.code !== "Enter") return;
    e.preventDefault();
    navigate("/");
    dispatch(clear());
    dispatch(saveChoice({category, sortBy, searchString}));
    dispatch(getBooks());
  }

  return (
    <header>
      <form>
        <h1>Поиск книг</h1>
        <div className="search">
          <input placeholder="Поиск..." type="text"
                 className="search__input"
                 onChange={(e) => setSearchString(e.target.value)}
                 onKeyDown={sendQuery}
          ></input>
          <img src={imgURL} alt="Искать" title="Искать" onClick={sendQuery}/>
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
      </form>
    </header>
  );
}

export default Header;