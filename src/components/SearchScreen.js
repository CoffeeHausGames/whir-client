import React from 'react';
import './SearchScreen.css';

function SearchScreen() {
  return (
    <div>
        <div className="search-input">
            <img src={process.env.PUBLIC_URL + '/images/search.svg'} alt="searchicon" className="search-icon" />
            <input className="main-search" type="text" placeholder="What are you looking for?" />
        </div>
      
      <div>
        <p className='content'>Some columned text here.</p>
        <p className='content'>More columned text here.</p>
      </div>
    </div>
  );
}

export default SearchScreen;