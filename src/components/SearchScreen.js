// SearchScreen.js
import React, { useState, useRef, useEffect } from 'react';
import Search from './Search';
import MapComponent from './Map';
import './SearchScreen.css';

const SearchScreen = ({ userLocation, onSearch }) => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const mapRef = useRef(null);

  const toggleMapVisibility = (businesses) => {
    setIsMapVisible(!isMapVisible);
    setBusinesses(businesses);
  };

  useEffect(() => {
    if (mapRef.current) {
      // Perform any map-related actions here
    }
  }, [isMapVisible]);

  return (
    <div>
      <Search onSearch={toggleMapVisibility} />
      {isMapVisible && (
        <div className="map-container" ref={mapRef}>
          {/* Pass userLocation as a prop */}
          <MapComponent userLocation={userLocation} businesses={businesses} />
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
