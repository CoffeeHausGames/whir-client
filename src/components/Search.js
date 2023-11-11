// Search.js
import React, { useState } from 'react';
import './Search.css';

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Perform search-related actions here
    onSearch(searchQuery);
  };

  const moveSearchBarToBottom = () => {
    if (!mapVisible) {
      setIsExpanded(true);
      setMapVisible(true);
      onSearch(); // Trigger the onSearch function to show the map
    }
  };

  return (
    <div className={`search-container ${isExpanded ? 'expanded' : ''}`}>
      <img
        src={process.env.PUBLIC_URL + '/images/search.svg'}
        alt="searchicon"
        className="search-icon"
        onClick={moveSearchBarToBottom}
      />
      <input
        className="main-search"
        type="text"
        placeholder="Enter ZIP code to find businesses nearby"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        onClick={moveSearchBarToBottom}
      />
    </div>
  );
};

export default Search;
