import { useSelector } from "react-redux";

function Counter() {
  const totalItems = useSelector(state => state.totalItems);
  if (totalItems === null) return (<></>);
  return (
    <div>
      <span>{totalItems > 0 ? `Найдено ${totalItems}` : `Не найдено по запросу`} .</span>
    </div>
  );
}

export default Counter;