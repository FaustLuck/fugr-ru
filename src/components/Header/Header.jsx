import { useState } from "react";
import List from "@c/List/List.jsx";
import { useDispatch } from "react-redux";
import { getBooks, clear } from "@s/actions.js";
import "@c/Header/Header.scss";
import { useNavigate } from "react-router-dom";

function Header() {
  const categories = [
    {all: "Все категории"},
    {art: "Искусство"},
    {biography: "Биография"},
    {computers: "Компьютер"},
    {history: "История"},
    {medical: "Медицина"},
    {poetry: "Поэзия"}
  ];
  const sortBy = [
    {relevance: "релевантности"},
    {newest: "новизне"}
  ];
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSortBy, setSelectedSortBy] = useState("relevance");
  const [searchString, setSearchString] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function sendQuery(e) {
    if (e.type === "keydown" && e.code !== "NumpadEnter" && e.code !== "Enter") return;
    e.preventDefault();
    navigate("/");
    dispatch(clear());
    dispatch(getBooks({selectedCategory, selectedSortBy, searchString}));
  }

  return (
    <header>
      <form>
        <h1>Поиск книг</h1>
        <input placeholder="Поиск..." type="text"
               className="search"
               onChange={(e) => setSearchString(e.target.value)}
               onKeyDown={sendQuery}
        ></input>
        {/*<input type="button" value="Поиск" title="Искать"/>*/}
        <div>
          <label>
            Категория:
            <List key={"categories"} list={categories}
                  handleChange={((value) => setSelectedCategory(value))}></List>
          </label>
          <label>
            Сортировать по
            <List key={"order"} list={sortBy}
                  handleChange={((value) => setSelectedSortBy(value))}></List>
          </label>
        </div>
      </form>
    </header>
  );
}

export default Header;