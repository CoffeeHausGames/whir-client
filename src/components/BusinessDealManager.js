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

    fetch('http://localhost:4444/business', {
      method: 'POST', // Assuming your API supports GET for fetching deals
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${businessAuthToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDeals(data);
      })
      .catch((error) => {
        console.error('Error fetching deals:', error);
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
