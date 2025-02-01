import { useDispatch } from "react-redux";
import { updateSearchFilter } from "../features/jobSlice";

const Search = () => {
  const dispatch = useDispatch();

  const searchHandler = (e) => {
    dispatch(updateSearchFilter(e.target.value.trim().toLowerCase()));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by job title..."
        className="form-control"
        onChange={searchHandler}
      />
    </div>
  );
};

export default Search;
