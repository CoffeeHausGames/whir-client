import React, { useState, useEffect } from 'react';
import CustomRepeatModal from './CustomRepeatModal';
import DealBox from './DealBox';
import { useAuth } from '../AuthContext'; // Import your authentication context
import './BusinessDealManager.css';

function BusinessDealManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deals, setDeals] = useState([]);
  const authContext = useAuth(); // Assuming you have a context for authentication

  useEffect(() => {
    // Fetch deals when the component mounts
    fetchDeals();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Refresh deals when the modal is closed
    fetchDeals();
  };

  const fetchDeals = () => {
    const businessAuthToken = authContext.businessUser ? authContext.businessUser.token : null;

    if (!businessAuthToken) {
      console.error('Business user authentication token not found.');
      return;
    }

    fetch('http://localhost:4444/business/deals', { // Assuming '/deal' endpoint for fetching deals
      method: 'GET', // Use Get method for fetching deals
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${businessAuthToken}`,
      },
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch deals. Server response: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log('Response body:', data);
      setDeals(data);
    })
    .catch((error) => {
      console.error('Error fetching deals:', error.message);
    });
  };

  const handleDealClick = (deal) => {
    console.log('Deal clicked:', deal);
    // Perform an action when a deal is clicked
  };

  return (
    <div>
      <button className="add-deal-button" onClick={openModal}>
        Add Deal/Event
      </button>
      {isModalOpen && <CustomRepeatModal isOpen={isModalOpen} onClose={closeModal} />}
      <DealBox deals={deals} onDealClick={handleDealClick} />
    </div>
  );
}

export default BusinessDealManager;
