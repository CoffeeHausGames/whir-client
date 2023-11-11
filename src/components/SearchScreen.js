// SearchScreen.js
import React, { useState, useRef, useEffect } from 'react';
import Search from './Search';
import MapComponent from './Map';
import './SearchScreen.css';

const SearchScreen = () => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const mapRef = useRef(null);

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
  };

  return (
    <div>
      <Search onSearch={toggleMapVisibility} />
      {isMapVisible && (
        <div className="map-container" ref={mapRef}>
          <MapComponent />
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
