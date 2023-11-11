import React, { useState } from 'react';
import './Search.css'; // You can create a CSS file for styling

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // You can perform any search-related actions here
    // For now, let's just pass the searchQuery to the parent component
    onSearch(searchQuery);
  };

  const toggleSearchBar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`search-container ${isExpanded ? 'expanded' : ''}`}>
      <img
        src={process.env.PUBLIC_URL + '/images/search.svg'}
        alt="searchicon"
        className="search-icon"
        onClick={toggleSearchBar}
      />
      <input
        className="main-search"
        type="text"
        placeholder="Enter ZIP code to find businesses nearby"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        onClick={toggleSearchBar}
      />
      {/* <button onClick={handleSearch}>Search</button> */}
      {isExpanded && (
        <div className="additional-component">
          {/* Render your additional component here */}
          <p>This is an additional component!</p>
        </div>
      )}
    </div>
  );
};

export default Search;