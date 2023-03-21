import { useState } from "react";
import ItemList from "./ItemList.jsx";

function List(props) {
  const [list] = useState(createList(props.list));

  function createList(list) {
    return list.map(el => {
      const [key, title] = Object.entries(el)[0];
      return <ItemList key={key} value={key} title={title}/>;
    });
  }

  return (
    <select onChange={(e) => props.handleChange(e.target.value)}>
      {list}
    </select>
  );
}

export default List;