// Search.js
import React, { useState, useEffect } from 'react';
import './Search.css';


const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = () => {
      var formattedCoordinates = {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        radius: 1000,
      };
  
      fetch('http://localhost:4444/business', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedCoordinates),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch deals. Server response: ${response.statusText}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log('Response body:', data);
          setBusinesses(data.data); // Set deals directly from response.data.data
        })
        .catch((error) => {
          console.error('Error fetching businesses:', error.message);
        });
    };
  
    if (userLocation) {
      fetchBusinesses();
    }
  }, [userLocation]);

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      console.log(businesses)
      const filtered = businesses.filter(business =>
        (business.business_name && business.business_name.toLowerCase().includes(lowerCaseQuery)) ||
        (business.description && business.description.toLowerCase().includes(lowerCaseQuery))
      );
      console.log(filtered)
      setFilteredBusinesses(filtered);
    } else {
      setFilteredBusinesses(businesses);
    }
  }, [searchQuery, businesses]);


  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Perform search-related actions here
    onSearch(searchQuery, userLocation);
  };

  const moveSearchBarToBottom = () => {
    if (!mapVisible) {
      setIsExpanded(true);
      setMapVisible(true);
      onSearch(); // Trigger the onSearch function to show the map
    }
  };

    // Function to get the user's current location
    const getUserLocation = async () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const userLocation = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
    
            // Store userLocation in local storage
            localStorage.setItem('userLocation', JSON.stringify(userLocation));
    
            setUserLocation(userLocation);
            console.log('User location:', userLocation);
    
            // Move the search bar to the bottom
            moveSearchBarToBottom();
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
        placeholder="Search for businesses near you. . ."
        value={searchQuery}
        onChange={handleSearchQueryChange}
        onClick={moveSearchBarToBottom}
      />
      
      <img
        src={process.env.PUBLIC_URL + '../images/crosshair.svg'}
        alt="locationicon"
        className="location-icon"
        onClick={getUserLocation}
      />
    </div>
  );
};

export default Search;
