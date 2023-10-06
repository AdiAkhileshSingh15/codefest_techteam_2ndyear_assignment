import React, { useState, useEffect } from 'react';
import WoList from './WoList';
const Search = ({ wos }) => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showError, setShowError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch =  (e) => {

    e.preventDefault();
    const results = wos.filter((wo) => wo.title === searchTitle);
    setSearchResults(results);
  
    if (results.length > 0 || searchTitle.trim() === '') {
      setShowError(false); // Hide the error message
    } else {
      setShowError(true); // Show the error message
    }
  
    setHasSearched(true); // Set this flag to true after searching
    // Clear the search input after submitting
    setSearchTitle('');
  };

  useEffect(() => {
    // You can place any code here that you want to run after searching
    // This effect will run when hasSearched changes
  }, [hasSearched]);

  return (
    <div>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search Workout Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button type="submit" className="search-button">
          <span role="img" aria-label="Search">🔍</span>
        </button>
      </form>
      {/* Conditional rendering of WoList based on search results */}
      {hasSearched && (
        searchResults.length > 0 ? (
    
          <WoList wos={searchResults} title="Search results" />
        ) : (
          // Show error message if there are no search results and showError is true
          showError && <p>No matching workouts found.</p>
        )
      )}
    </div>
  );
};

export default Search;
