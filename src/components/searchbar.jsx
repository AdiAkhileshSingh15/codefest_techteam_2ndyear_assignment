import React from "react"

const SearchBar = () => {
  return (
    <form className="Searchbar">
      <input type="text" name="search" id="search" placeholder="Search..." />
      <button type="submit" className="search-button">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </form>
  )
}

export default SearchBar
