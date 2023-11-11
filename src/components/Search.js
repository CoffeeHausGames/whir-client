import React, { useState } from 'react';
import './Search.css'; // You can create a CSS file for styling

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation, setUserLocation] = useState(null);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // You can perform any search-related actions here
    // For now, let's just pass the searchQuery and userLocation to the parent component
    onSearch({ searchQuery, userLocation });
  };

  // Function to get the user's current location
  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log('User location:', userLocation);
        },
        (error) => {
          console.error('Error getting user location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
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
      <img
        src={process.env.PUBLIC_URL + '/images/crosshair.svg'}
        alt="locationicon"
        className="location-icon"
        onClick={getUserLocation}
      />
      {/* <button onClick={handleSearch}>Search</button> */}
    </div>
  );
};

export default Search;
