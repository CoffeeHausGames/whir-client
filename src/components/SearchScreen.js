import React, { useState, useEffect } from 'react';

function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const requestBody = {
          query: searchQuery,
        };

        const response = await fetch('http://localhost:4444/business/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }

        const data = await response.json();

        if (Array.isArray(data.data) && data.data.length > 0) {
          // Extract and filter business names based on the search query
          const filteredResults = data.data
            .map((item) => item.business_name)
            .filter((name) =>
              name.toLowerCase().includes(searchQuery.toLowerCase())
            );

          if (filteredResults.length > 0) {
            setSearchResults(filteredResults);
            setError(null);
          } else {
            setError('No matching results found.');
          }
        } else {
          setError('No matching results found.');
        }
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching search results.');
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div>
      <div className="search-input">
        <img
          src={process.env.PUBLIC_URL + '/images/search.svg'}
          alt="searchicon"
          className="search-icon"
        />
        <input
          className="main-search"
          type="text"
          placeholder="What are you looking for?"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
      </div>

      {error && <p>{error}</p>}

      <div className="search-results">
        <ul>
          {searchResults.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>

      <div>
        <p className="content">Some columned text here.</p>
        <p className="content">More columned text here.</p>
      </div>
    </div>
  );
}

export default SearchScreen;
