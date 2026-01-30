import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <label>
        filter:
        <input
          type="text"
          name="filter"
          onChange={(e) => dispatch(filterChange(e.target.value))}
        />{" "}
      </label>
    </div>
  );
};

export default Filter;
