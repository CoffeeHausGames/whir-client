// DealDisplay.js
import React, { useEffect, useState } from 'react';
import './DealDisplay.css';

const DealDisplay = ({ userLocation }) => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        if (userLocation && userLocation.latitude && userLocation.longitude) {
          const response = await fetch('http://localhost:4444/business/deal', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch deals. Server response: ${response.statusText}`);
          }

          const data = await response.text();

          // Check if the response is not empty before parsing JSON
          if (data.trim() !== '') {
            const jsonData = JSON.parse(data);
            setDeals(jsonData.data);
          }
        }
      } catch (error) {
        console.error('Error fetching deals:', error.message);
      }
    };

    fetchDeals();
  }, [userLocation]);

  return (
    <div className="deal-display-container">
      <h2>Current Deals</h2>
      <ul>
        {deals.map((deal) => (
          <li key={deal.id}>
            <strong>{deal.title}</strong>: {deal.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DealDisplay;
