import { useDispatch, useSelector } from "react-redux";
import { updateSearchFilter } from "../features/jobSlice";
import { useState } from "react";

const Search = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue]= useState("");
  const {filter} = useSelector(state=> state.jobs);

  const searchHandler = (e) => {
    setSearchValue(e.target.value)
    dispatch(updateSearchFilter(e.target.value.trim().toLowerCase()));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by job title..."
        className="form-control"
        value={searchValue || filter}
        onChange={searchHandler}
      />
    </div>
  );
};

export default Search;
