import React, { useState, useEffect } from 'react';
import './BusinessDealManager.css';
import DealBox from './DealBox';

const BusinessDealManager = () => {
 const [showForm, setShowForm] = useState(false);
 const [dealName, setDealName] = useState('');
 const [dealStart, setDealStart] = useState('');
 const [dealEnd, setDealEnd] = useState('');
 const [dayOfWeek, setDayOfWeek] = useState('');
 const [repeating, setRepeating] = useState('');
 const [description, setDescription] = useState('');

 // Insert the deals directly into the deals state
 const [deals, setDeals] = useState([
   { id: 1, name: 'Deal 1', description: 'Description 1' },
   { id: 2, name: 'Deal 2', description: 'Description 2' },
   // Add more deals here...
 ]);

 const [showDealBox, setShowDealBox] = useState(true);

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

 const handleSaveDeal = () => {
   // Use an API call to save the deal information to the backend
   // You can use libraries like axios to make the API call
   // Example: axios.post('/api/deals', { name: dealName, start_time: dealStart, ... })
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
        <h1 className="deal-manager-title">
          Manage your Deals
        </h1>
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

          <label className="item day-of-week-label">Day of Week:</label>
          <select
            className="input day-of-week-select"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
          >
            <option value="">Select a day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>

          <label className="item repeating-label">Repeating:</label>
          <select
            className="input repeating-select"
            value={repeating}
            onChange={(e) => setRepeating(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
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
         {showDealBox && (
           <DealBox />
         )}
    </div>
  );
};

export default BusinessDealManager;
