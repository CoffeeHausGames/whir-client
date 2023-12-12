// BusinessDealManager.js
import React, { useState, useEffect } from 'react';
import CustomRepeatModal from './CustomRepeatModal';
import DealBox from './DealBox';
import { useAuth } from '../utils/AuthContext';
import './BusinessDealManager.css';
import { apiRequestWithAuthRetry } from '../utils/NetworkContoller';

function BusinessDealManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const authContext = useAuth();

  useEffect(() => {
    // Fetch deals when the component mounts
    fetchDeals();
  }, []); // Empty dependency array

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Refresh deals when the modal is closed
    fetchDeals();
  };

  const fetchDeals = () => {
    console.log(authContext.businessUser.token)
    const businessAuthToken = authContext.businessUser ? authContext.businessUser.token : null; 
    apiRequestWithAuthRetry('/business/deal', 'GET', null, undefined, businessAuthToken)
      .then((data) => {
        setDeals(data.data);
      })
      .catch((error) => {
        console.error('Error fetching deals:', error.message);
      });
  };

  const handleDealClick = (deal) => {
    setSelectedDeal(deal); // Update the selected deal
  };

  return (
    <div>
      <button className="add-deal-button" onClick={openModal}>
        Add Deal/Event
      </button>
      {isModalOpen && <CustomRepeatModal isOpen={isModalOpen} onClose={closeModal} />}
      <DealBox deals={deals} onDealClick={handleDealClick} selectedDeal={selectedDeal} />
    </div>
  );
}

export default BusinessDealManager;
