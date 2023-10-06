import React, { useState } from "react";
import { SearchById } from "../Swagger Api/Actions";


export default function Search_bar(props) {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const SearchById2 = (event) => {
    event.preventDefault();
    const inputValue = searchValue;
    console.log("Search Value:", inputValue);
    SearchById(inputValue);
  };
  return (
    <div className="col-3">
      <form className="form-inline my-2 my-lg-0 d-flex justify-content-between mr-sm-2">
        {/* <span><ion-icon name="search-outline"></ion-icon></span> */}
        <input
          className="form-control"
          type="search"
          placeholder="Search by workId"
          aria-label="Search"
          value={searchValue}
          onChange={handleInputChange}
        />

        <button
          className="btn btn-secondary btn-sm my-2 my-sm-0 mx-2"
          type="submit"
          onClick={SearchById2}
        >
          Search
        </button>
      </form>
    </div>
  );
}
