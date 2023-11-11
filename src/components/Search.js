// SearchComponent.js
import React, { useState } from 'react';
import './Search.css'; // You can create a CSS file for styling

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // You can perform any search-related actions here
    // For now, let's just pass the searchQuery to the parent component
    onSearch(searchQuery);
  };

  return (
    <div className="search-container">
      <img
        src={process.env.PUBLIC_URL + '/images/search.svg'}
        alt="searchicon"
        className="search-icon"
      />
      <input
        className="main-search"
        type="text"
        placeholder="Enter ZIP code to find businesses nearby"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
    </div>
  );
};

export default Search;
