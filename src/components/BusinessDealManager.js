import React, { useState } from 'react';
import './BusinessDealManager.css';
import DealBox from './DealBox';
import CustomRepeatModal from './CustomRepeatModal';

const BusinessDealManager = () => {
  const [showForm, setShowForm] = useState(false);
  const [dealName, setDealName] = useState('');
  const [dealStart, setDealStart] = useState('');
  const [dealEnd, setDealEnd] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [repeating, setRepeating] = useState('');
  const [description, setDescription] = useState('');
  const [showDealBox, setShowDealBox] = useState(true);
  const [customRepeatModal, setCustomRepeatModal] = useState(false);
  const [customRepeatConfig, setCustomRepeatConfig] = useState({
    startDate: '',
    repeatEvery: { value: '1', unit: 'day' },
    endDate: '',
    days: [],
  });
  
  const toggleCustomRepeatModal = () => {
    setCustomRepeatModal(!customRepeatModal);
  };

  const handleSaveDeal = () => {
    // Create a new deal object from the form data
    const newDeal = {
      name: dealName,
      start_time: dealStart,
      end_time: dealEnd,
      day_of_week: dayOfWeek,
      run_time: repeating,
      description: description,
      customRepeat: customRepeatConfig, // Add custom repeat configuration
    };

    // Make a PUT request to update the user's "Deals" array
    fetch(`/api/business/deals`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDeal),
    })
      .then((response) => response.json())
      .then((updatedDeals) => {
        // Handle the response if needed
        console.log('User Deals updated:', updatedDeals);

        // Reset the form fields and hide the form
        setDealName('');
        setDealStart('');
        setDealEnd('');
        setDayOfWeek('');
        setRepeating('');
        setDescription('');

        // Show the DealBox with the updated deals
        setShowForm(false);
        setShowDealBox(true);
      })
      .catch((error) => {
        console.error('Error updating user deals:', error);
      });
  };

  const handleAddDeal = () => {
    setShowDealBox(false);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowDealBox(true);
    setShowForm(false);
  };

  return (
    <div className="business-deal-manager">
      <div className="deal-manager-header">
        <h1 className="deal-manager-title">Manage your Deals</h1>
      </div>
      {!showForm && (
        <button className="add-deal-button" onClick={handleAddDeal}>
          Add Deal
        </button>
      )}

      {showForm && (
        <CustomRepeatModal
          isOpen={showForm}
          onRequestClose={handleCancel}
          customRepeatConfig={customRepeatConfig}
          setCustomRepeatConfig={setCustomRepeatConfig}
          toggleCustomRepeatModal={toggleCustomRepeatModal}
          dealName={dealName}
          description={description}
          setDealName={setDealName}
          setDescription={setDescription}
          handleSaveDeal={handleSaveDeal}
        />
      )}

      {showDealBox && <DealBox />}
      {customRepeatModal && (
        <CustomRepeatModal
          isOpen={customRepeatModal}
          onRequestClose={toggleCustomRepeatModal}
          customRepeatConfig={customRepeatConfig}
          setCustomRepeatConfig={setCustomRepeatConfig}
          toggleCustomRepeatModal={toggleCustomRepeatModal}
          dealName={dealName}
          description={description}
          setDealName={setDealName}
          setDescription={setDescription}
          handleSaveDeal={handleSaveDeal}
        />
      )}
    </div>
  );
};

export default BusinessDealManager;
