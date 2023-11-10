import React from 'react';
import './DealBox.css';

const DealBox = ({ deals, onDealClick }) => {
  const handleDealClick = (deal) => {
    console.log('Deal clicked:', deal);
    // Perform an action when a deal is clicked
    onDealClick(deal);
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
