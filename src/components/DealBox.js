import React, { useState, useEffect } from 'react';
import './DealBox.css';

const DealBox = () => {
  const [deals, setDeals] = useState([
    { id: 1, name: 'Deal 1', description: 'Description 1' },
    { id: 2, name: 'Deal 2', description: 'Description 2' },
    { id: 3, name: 'Deal 3', description: 'Description 3' },
    { id: 4, name: 'Deal 4', description: 'Description 4' },
    { id: 5, name: 'Deal 5', description: 'Description 5' },
    { id: 6, name: 'Deal 6', description: 'Description 6' },
    { id: 7, name: 'Deal 7', description: 'Description 7' },
    { id: 8, name: 'Deal 8', description: 'Description 8' },
    { id: 9, name: 'Deal 9', description: 'Description 9' },
    { id: 10, name: 'Deal 10', description: 'Description 10' },
  ]);

  useEffect(() => {
    fetch('APICODEHERE')
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
      {deals.map((deal, index) => (
        <button className="deal-button" key={index} onClick={() => handleDealClick(deal)}>
          <h2>{deal.name}</h2>
          <p>{deal.description}</p>
        </button>
      ))}
    </div>
  );
};

export default DealBox;
