import React, { useState, useEffect } from 'react';
import './Search.css';
import { apiRequest } from '../utils/NetworkContoller';

const Search = ({ onSearch }) => {
 const [searchQuery, setSearchQuery] = useState('');
 const [isExpanded, setIsExpanded] = useState(false);
 const [mapVisible, setMapVisible] = useState(false);
 const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });
 const [businesses, setBusinesses] = useState([]);
 const [filteredBusinesses, setFilteredBusinesses] = useState([]);
 const [showDropdown, setShowDropdown] = useState(false);
 // eslint-disable-next-line no-unused-vars
 const [selectedBusiness, setSelectedBusiness] = useState(null);


 useEffect(() => {
  const fetchBusinesses = async () => {
    var formattedCoordinates = {
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      radius: 1000,
    };

    try {
      const response = await apiRequest('/business', 'POST', formattedCoordinates, {
        'Content-Type': 'application/json',
      });

      console.log('Response body:', response);
      setBusinesses(response.data); // Set deals directly from response.data.data
    } catch (error) {
      console.error('Error fetching businesses:', error.message);
    }
  };

  if (userLocation) {
    fetchBusinesses();
  }
}, [userLocation]);

  // Function to get the location of a business
  const getBusinessLocation = (business) => {
    if (business && business.location && business.location.coordinates) {
      const [latitude, longitude] = business.location.coordinates;
      return { latitude, longitude };
    }
    return null;
  };

  // Function to show the business location on the map
  const showBusinessLocationOnMap = (business) => {
    const businessLocation = getBusinessLocation(business);
    if (businessLocation) {
      onSearch(businessLocation);
      setShowDropdown(false);
    } else {
      console.error(`Invalid location data for business: ${business.business_name}`);
    }
  };

  const handleSearchResultClick = (business) => {
    setSearchQuery(business.business_name);
    setShowDropdown(false);
    setSelectedBusiness(business); // Set the selected business
    showBusinessLocationOnMap(business); // Show the selected business on the map    
  };

  useEffect(() => {
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = businesses.filter(
        (business) =>
          (business.business_name &&
            business.business_name.toLowerCase().includes(lowerCaseQuery)) ||
          (business.description &&
            business.description.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredBusinesses(filtered);
      setShowDropdown(true);
    } else {
      setFilteredBusinesses([]);
      setShowDropdown(false);
    }
  }, [searchQuery, businesses]);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
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

  const renderDropdown = () => {
    return (
      <div className="search-dropdown">
        {filteredBusinesses.map((business) => (
          <div key={business.business_name} onClick={() => handleSearchResultClick(business)}>
            {business.business_name}
          </div>
        ))}
      </div>
    );
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
        placeholder="Search for businesses near you..."
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
      {showDropdown && renderDropdown()}

    </div>
  );
};

export default Search;
