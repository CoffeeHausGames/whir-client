import React, { useState } from 'react';
import './DealBox.css';
import { useAuth } from '../AuthContext';

const DealBox = ({ deals, onDealClick, selectedDeal }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedDeal, setEditedDeal] = useState({ ...selectedDeal });

  const handleDealClick = (deal) => {
    onDealClick(deal);
    // Reset edit mode and initialize editedDeal with the selected deal
    setIsEditMode(false);
    setEditedDeal({ ...deal });
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelClick = () => {
    // Reset the state and exit edit mode
    setIsEditMode(false);
    setEditedDeal({ ...selectedDeal });
  };

  const authContext = useAuth();

  const handleSaveClick = () => {
    const businessAuthToken = authContext.businessUser
      ? authContext.businessUser.token
      : null;

    if (!businessAuthToken) {
      console.error('Business user authentication token not found.');
      return;
    }

    const updatedDeal = {
      id: editedDeal.id, // Include the deal ID in the body
      name: editedDeal.name,
      start_time: new Date(editedDeal.start_time).toISOString(),
      end_time: new Date(editedDeal.end_time).toISOString(),
      day_of_week: editedDeal.day_of_week,
      start_date: new Date(editedDeal.start_date).toISOString(),
      end_date: new Date(editedDeal.end_date).toISOString(),
      description: editedDeal.description,
    };

    console.log('Updated Deal Body:', updatedDeal);

    fetch(`http://localhost:4444/business/deal`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${businessAuthToken}`,
      },
      body: JSON.stringify(updatedDeal),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update deal. Server response: ${response.statusText}`);
        }
        // If successful, toggle back to view mode and update the selected deal
        setIsEditMode(false);
        onDealClick(editedDeal);
      })
      .catch((error) => {
        console.error('Error updating deal:', error.message);
      });
  };

  // Function to format the date in mm/dd/yyyy format
  const formatDate = (dateString) => {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to format the time in 12-hour clock format
  const formatTime = (timeString) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return new Date(timeString).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="deal-box placeholder" style={{ display: 'flex' }}>
      <div className="deal-list">
        {deals && deals.length > 0 ? (
          deals.map((deal, index) => (
            <button className="deal-button" key={index} onClick={() => handleDealClick(deal)}>
              <h2>{deal.name}</h2>
              <p>{deal.description}</p>
            </button>
          ))
        ) : (
          <p>No deals</p>
        )}
      </div>
      <div className="deal-details">
        {selectedDeal && (
          <>
            {!isEditMode ? (
              <>
                <h1 className="deal-box-deal-name">{selectedDeal.name}</h1>
                <h2 className="deal-box-deal-dow">{selectedDeal.day_of_week}</h2>
                <h3 className="deal-box-deal-desc">{selectedDeal.description}</h3>
                <p className="deal-box-deal-startdate">Start date: {formatDate(selectedDeal.start_date)}</p>
                <p className="deal-box-deal-enddate">End date: {formatDate(selectedDeal.end_date)}</p>
                <p className="deal-box-deal-starttime">Start time: {formatTime(selectedDeal.start_time)}</p>
                <p className="deal-box-deal-endtime">End time: {formatTime(selectedDeal.end_time)}</p>
                <button className="edit-deal-button" onClick={handleEditClick}>Edit Deal</button>
              </>
            ) : (
              <>
                <p>Deal Name</p>
                <input
                  type="text"
                  value={editedDeal.name}
                  onChange={(e) => setEditedDeal({ ...editedDeal, name: e.target.value })}
                />
                <p>Day of the Week</p>
                <input
                  type="text"
                  value={editedDeal.day_of_week}
                  onChange={(e) => setEditedDeal({ ...editedDeal, day_of_week: e.target.value })}
                />
                <p>Description</p>
                <input
                  type="text"
                  value={editedDeal.description}
                  onChange={(e) => setEditedDeal({ ...editedDeal, description: e.target.value })}
                />
                <p>Start Date/End Date</p>
                <input
                  type="datetime-local"
                  value={editedDeal.start_date}
                  onChange={(e) => setEditedDeal({ ...editedDeal, start_date: e.target.value })}
                />
                <input
                  type="datetime-local"
                  value={editedDeal.end_date}
                  onChange={(e) => setEditedDeal({ ...editedDeal, end_date: e.target.value })}
                />
                <p>Start Time/End Time</p>
                <input
                  type="datetime-local"
                  value={editedDeal.time}
                  onChange={(e) => setEditedDeal({ ...editedDeal, start_time: e.target.value })}
                />
                <input
                  type="datetime-local"
                  value={editedDeal.time}
                  onChange={(e) => setEditedDeal({ ...editedDeal, end_time: e.target.value })}
                />
                <button className="save-edit-button" onClick={handleSaveClick}>Save</button>
                <button className="cancel-edit-button" onClick={handleCancelClick}>Cancel</button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DealBox;
