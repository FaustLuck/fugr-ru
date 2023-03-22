import { useState } from "react";

function List(props) {
  const [list] = useState(createList(props.list));

  function createList(list) {
    return list.map(el => {
      const [key, title] = Object.entries(el)[0];
      return <option key={key} value={key}>{title}</option>;
    });
  }

  return (
    <select onChange={(e) => props.handleChange(e.target.value)}>
      {list}
    </select>
  );
}

export default List;