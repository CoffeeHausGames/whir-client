import React, { useState, useRef } from 'react';
import Search from './Search';
import MapComponent from './Map';
import DealDisplay from './DealDisplay';
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
        <div className="deal-content-box">
        <div className="map-container" ref={mapRef}>
          <MapComponent selectedBusinessLocation={selectedBusinessLocation} />
        </div>
        <div className="deal-display-side">
          <DealDisplay setSelectedBusinessLocation={setSelectedBusinessLocation} />
        </div>
        </div>
      )}
    </div>
  );
};

export default SearchScreen;