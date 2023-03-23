import { useSelector } from "react-redux";

function Counter() {
  const totalItems = useSelector(state => state.totalItems);
  if (totalItems === null) return (<></>);
  return (
    <div>
      <span>Найдено {totalItems}.</span>
    </div>
  );
}

export default Counter;