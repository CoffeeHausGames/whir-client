// DealBox.js
import React from 'react';
import './DealBox.css';

const DealBox = ({ deals, onDealClick, selectedDeal }) => {
  const handleDealClick = (deal) => {
    onDealClick(deal);
  };

  // Function to format the date in mm/dd/yyyy format
  const formatDate = (dateString) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to format the time in 12-hour clock format
  const formatTime = (timeString) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(timeString).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="deal-box placeholder" style={{ display: 'flex' }}>
      <div className="deal-list">
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
      <div className="deal-details">
        {selectedDeal && (
          <>
            <h1>{selectedDeal.name}</h1>
            <h2>{selectedDeal.day_of_week}</h2>
            <h3>{selectedDeal.description}</h3>
            <p>{formatDate(selectedDeal.start_date)}</p>
            <p>{formatDate(selectedDeal.end_date)}</p>
            <p>{formatTime(selectedDeal.start_time)}</p>
            <p>{formatTime(selectedDeal.end_time)}</p>
            {/* Add more details as needed */}
          </>
        )}
      </div>
    </div>
  );
};

export default DealBox;
