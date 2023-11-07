import React, { useState, useEffect } from 'react';
import './DealBox.css';

const DealBox = () => {
 const [deals, setDeals] = useState([]);

 useEffect(() => {
   fetch('http://localhost:4444/business', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       // Your request body here
     }),
   })
     .then(response => response.json())
     .then(data => {
       setDeals(data);
     })
     .catch(error => {
       console.error('Error fetching deals:', error);
     });
 }, []);

 const handleDealClick = (deal) => {
   console.log('Deal clicked:', deal);
   // Perform an action when a deal is clicked
 };

 return (
   <div className="deal-box placeholder">
      {deals.length > 0 ? (
        deals.map((deal, index) => (
          <button className="deal-button" key={index} onClick={() => handleDealClick(deal)}>
            <h2>{deal.name}</h2>
            <p>{deal.description}</p>
          </button>
        ))
      ) : (
        <p>No deals</p>
      )}
   </div>
 );
};

export default DealBox;
