import React, { useEffect, useState } from 'react';
import './DealDisplay.css';
import { apiRequest } from '../utils/NetworkContoller';

const DealDisplay = ({ setSelectedBusinessLocation }) => {
  const [businesses, setBusinesses] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const userLocation = JSON.parse(localStorage.getItem('userLocation'));

      if (userLocation && userLocation.latitude !== 0 && userLocation.longitude !== 0) {
        var formattedCoordinates = {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          radius: 1000,
        };

        try {
          const response = await apiRequest('/business', 'POST', formattedCoordinates, {
            'Content-Type': 'application/json',
          });
          console.log(response.data)
          // Calculate distance for each business and add it as a property
          const businessesWithDistance = response.data.map((business) => ({
            ...business,
            distance: calculateDistance(userLocation, business.location.coordinates),
          }));

          // Sort businesses based on distance
          const sortedBusinesses = businessesWithDistance.sort((a, b) => a.distance - b.distance);

          setBusinesses(sortedBusinesses);
        } catch (error) {
          console.error('Error fetching businesses:', error.message);
        }
      } else {
        console.log('Please share your location in order to view businesses near you');
      }
    };

    fetchBusinesses();
  }, []);

  // Function to calculate distance between two sets of coordinates (in this case, user and business locations)
  const calculateDistance = (userLocation, businessLocation) => {
    const radlat1 = (Math.PI * userLocation.latitude) / 180;
    const radlat2 = (Math.PI * businessLocation[1]) / 180;
    const theta = userLocation.longitude - businessLocation[0];
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515; // miles
    return dist;
  };

// Function to get the location of a business
const getBusinessLocation = (business) => {
 console.log(`Business: ${JSON.stringify(business)}`);
 if (business && business.location && business.location.coordinates) {
   const [longitude, latitude] = business.location.coordinates;
   return { latitude, longitude };
 }
 return null;
};
  // Function to handle deal click
  const handleDealClick = (business) => {
    console.log(business);
    const businessLocation = getBusinessLocation(business);
    if (businessLocation) {
      setSelectedBusinessLocation(businessLocation);
      setSelectedBusiness(business);
    } else {
      console.error(`Invalid location data for business: ${business.id}`);
    }
  };

  // Function to format the distance for display
  const formatDistance = (distance) => {
    if (distance >= 10) {
      return distance.toFixed(0); // Show only 1 digit if the distance is 10 or more
    } else if (distance >= 0.1) {
      return distance.toFixed(1); // Show 1 decimal place if the distance is between 0.1 and 9.9
    } else {
      return distance.toFixed(2); // Show 2 decimal places for distances less than 0.1
    }
  };

  return (
    <div className="deal-display-container">
      <h2 className="deal-header">Deals Near You</h2>
      {businesses.map((business) => (
        <div key={business.business_name}>
          {business.deal && business.deal.length > 0 ? (
            <ul>
              {business.deal.map((deal) => (
                <button onClick={() => handleDealClick(business)} key={deal.id} className="deal-button-display">
                  <li>
                    <p className="deal-title">{deal.name}</p>
                    <p className="deal-business-name">{business.business_name}</p>
                    <p className="deal-description">{deal.description}</p>
                    <p className="deal-distance">{formatDistance(business.distance)}m away</p>
                    <p>Start Date: {deal.start_date}, End Date: {deal.end_date}</p>
                  </li>
                </button>
              ))}
            </ul>
          ) : (
            <p>No deals available for this business</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default DealDisplay;
