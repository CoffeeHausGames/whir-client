// SearchScreen.js
import React, { useState, useRef, useEffect } from 'react';
import Search from './Search';
import MapComponent from './Map';
import './SearchScreen.css';

const SearchScreen = ({ userLocation, onSearch }) => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const mapRef = useRef(null);
  const [showComponent, setShowComponent] = useState(false);


  const toggleMapVisibility = (businesses) => {
    setIsMapVisible(!isMapVisible);
    setBusinesses(businesses);
  };

  useEffect(() => {
    if (mapRef.current) {
      // Perform any map-related actions here
    }
  }, [isMapVisible]);

  useEffect(() => {
    setShowComponent(true); // Show the component immediately

    // Add the transition effect after a short delay
    const transitionDelay = setTimeout(() => {
      setShowComponent(false); // Remove the transition effect class
    }, 100); // You can adjust the duration as needed

    return () => clearTimeout(transitionDelay);
  }, []);

  return (
    <div className={`searchscreen ${showComponent ? 'visible' : 'transition-effect'}`}>
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
