import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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
        <>
          <label className="item deal-name-label">Deal Name:</label>
          <input
            className="input deal-name-input"
            type="text"
            value={dealName}
            onChange={(e) => setDealName(e.target.value)}
          />

          <label className="item deal-start-label">Deal Start:</label>
          <input
            className="input deal-start-input"
            type="datetime-local"
            value={dealStart}
            onChange={(e) => setDealStart(e.target.value)}
          />

          <label className="item deal-end-label">Deal End:</label>
          <input
            className="input deal-end-input"
            type="datetime-local"
            value={dealEnd}
            onChange={(e) => setDealEnd(e.target.value)}
          />

          <label className="item repeating-label">Repeating:</label>
          <select
            className="input repeating-select"
            value={repeating}
            onChange={(e) => {
              setRepeating(e.target.value);
              if (e.target.value === 'Custom') {
                setCustomRepeatModal(true);
              }
            }}
            >
            <option value="">Select an option</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
            <option value="Custom">Custom</option>
          </select>

          <label className="item description-label">Description:</label>
          <input
            className="input description-input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="button-container">
            <button className="save save-deal-button" onClick={handleSaveDeal}>
              Save Deal
            </button>

            <button className="cancel cancel-deal-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      )}
      {showDealBox && <DealBox />}
      {customRepeatModal && (
       <CustomRepeatModal
         isOpen={customRepeatModal}
         onRequestClose={toggleCustomRepeatModal}
         customRepeatConfig={customRepeatConfig}
         setCustomRepeatConfig={setCustomRepeatConfig}
         toggleCustomRepeatModal={toggleCustomRepeatModal}
       />
     )}
    </div>
  );
};

export default BusinessDealManager;
