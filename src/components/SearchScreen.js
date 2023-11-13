// SearchScreen.js
import React, { useState, useRef } from 'react';
import Search from './Search';
import MapComponent from './Map';
import './SearchScreen.css';

const SearchScreen = () => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [selectedBusinessLocation, setSelectedBusinessLocation] = useState(null);
  const mapRef = useRef(null);

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
  };

  const handleSearch = (businessLocation) => {
    setSelectedBusinessLocation(businessLocation);
    toggleMapVisibility();
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      {isMapVisible && (
        <div className="map-container" ref={mapRef}>
          <MapComponent selectedBusinessLocation={selectedBusinessLocation} />
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
