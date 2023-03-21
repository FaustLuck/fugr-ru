function ItemList(props) {
  return (
    <option value={props.value}>{props.title}</option>
  );
}

export default ItemList;