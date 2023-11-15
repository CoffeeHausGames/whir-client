// DealDisplay.js
import React, { useEffect, useState } from 'react';
import './DealDisplay.css';
import MapComponent from './Map';

const DealDisplay = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinessLocation, setSelectedBusinessLocation] = useState(null);

  useEffect(() => {
    const fetchBusinesses = () => {
      const userLocation = JSON.parse(localStorage.getItem('userLocation'));

      if (userLocation && userLocation.latitude !== 0 && userLocation.longitude !== 0) {
        var formattedCoordinates = {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          radius: 1000,
        };

        fetch('http://localhost:4444/business', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedCoordinates),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch businesses. Server response: ${response.statusText}`);
            }
            return response.json();
          })
          .then((data) => {
            setBusinesses(data.data);
          })
          .catch((error) => {
            console.error('Error fetching businesses:', error.message);
          });
      } else {
        console.log('Please share your location in order to view businesses near you');
      }
    };

    fetchBusinesses();
  }, []);

  const handleBusinessClick = (businessLocation) => {
    setSelectedBusinessLocation(businessLocation);
  };

  return (
    <div className="deal-display-container">
      <h2>Current Deals</h2>
      {businesses.map((business) => (
        <div key={business.business_name}>
          <h3>{business.business_name}</h3>
          {business.deal && business.deal.length > 0 ? (
            <ul>
              {business.deal.map((deal) => (
                <button onClick={() => handleBusinessClick(deal.location)}>
                <li key={deal.id}>
                    <strong>{deal.name}</strong>: {deal.description}
                    <br />
                    Start Date: {deal.start_date}, End Date: {deal.end_date}  
                </li>
                </button>
              ))}
            </ul>
          ) : (
            <p>No deals available for this business</p>
          )}
        </div>
      ))}
      {selectedBusinessLocation && <MapComponent selectedBusinessLocation={selectedBusinessLocation} />}
    </div>
  );
};

export default DealDisplay;