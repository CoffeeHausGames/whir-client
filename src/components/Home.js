// Home.js
import React, { useState, useEffect } from 'react';
import Search from './Search'; // Update the path based on your project structure
import './Home.css';

function Home() {
  const [showComponent, setShowComponent] = useState(false);

  useEffect(() => {
    setShowComponent(true);

    const transitionDelay = setTimeout(() => {
      setShowComponent(false);
    }, 100);

    return () => clearTimeout(transitionDelay);
  }, []);

  const handleSearch = (searchQuery) => {
    // Implement the logic for handling the search query in your Home component
    console.log('Search Query:', searchQuery);
    // You can perform actions like fetching data, updating state, etc.
  };

  return (
    <div className="body-img">
      <div>
        <img
          src={process.env.PUBLIC_URL + '/images/whirpng_croppedslim_white.png'}
          alt="mapimage"
          className="logo-img-home"
        />
      </div>
      <div className="main-img-container">
        <img
          src={process.env.PUBLIC_URL + '/images/map_sil_fade.png'}
          alt="mapimage"
          className="main-img"
        />
      </div>
      <div className="search-container">
        <Search onSearch={handleSearch} />
      </div>
      <div className="main-text-home">
        <div className={`home ${showComponent ? 'visible' : 'transition-effect'}`}>
          <h1>Welcome to Whir</h1>
          <p>
            Discover Local Delights with Whir: Your one-stop destination for all things local.
            Explore exclusive deals, events, and promotions, while supporting community businesses.
            Join the Whir community to unlock unique membership perks and be part of the movement
            that revitalizes local commerce
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
