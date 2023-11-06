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
        if (!/^\d{5}$/.test(searchQuery)) {
          setError('Please enter a valid 5-digit ZIP code.');
          return;
        }

        const requestBody = {
          zipCode: searchQuery,
        };

        const response = await fetch('http://localhost:4444/business', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }

        const responseData = await response.json();

        // Check if the "data" array exists in the response
        if (Array.isArray(responseData.data)) {
          // Filter business names based on the search query
          const filteredResults = responseData.data
            .filter((item) =>
              item.zipCode === searchQuery && item.business_name
            )
            .map((item) => item.business_name);

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
