import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useAuth } from '../utils/AuthContext';
import './CustomRepeatModal.css';
import { apiRequestWithAuthRetry } from '../utils/NetworkContoller';

function CustomRepeatModal({ isOpen, onClose }) {
  const [deal, setDeal] = useState({
    name: '',
    start_time: '',
    end_time: '',
    day_of_week: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  const authContext = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDeal({ ...deal, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // If auth token is null then we are using cookies for auth and this shouldn't matter
    const businessAuthToken = authContext.businessUser
      ? authContext.businessUser.token
      : null;

    // if (!businessAuthToken) {
    //   console.error('Business user authentication token not found.');
    //   return;
    // }

    // Structure the deal object to match the expected format with timestamps
    const formattedDeal = {
      name: deal.name,
      start_time: new Date(deal.start_time).toISOString(),
      end_time: new Date(deal.end_time).toISOString(),
      day_of_week: deal.day_of_week,
      start_date: new Date(deal.start_date).toISOString(),
      end_date: new Date(deal.end_date).toISOString(),
      description: deal.description,
    };

    try {
      const response = await apiRequestWithAuthRetry('/business/deal', 'POST', formattedDeal, {
        'Content-Type': 'application/json',
        Authorization: `${businessAuthToken}`,
      }, true, businessAuthToken);
  
      console.log(response);
  
      setDeal({
        name: '',
        start_time: '',
        end_time: '',
        day_of_week: '',
        start_date: '',
        end_date: '',
        description: '',
      });
  
      onClose();
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleCancel = () => {
    setDeal({
      name: '',
      start_time: '',
      end_time: '',
      day_of_week: '',
      start_date: '',
      end_date: '',
      description: '',
    });
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="backdrop">
      <div className="modal-content">
        <form className="modal" onSubmit={handleSubmit}>
          <div className="name-row">
            <p>Deal Name</p>
            <input
              className="deal-name"
              type="text"
              name="name"
              value={deal.name}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>

          <div className="time-row">
            <p>Start Date</p>
            <input
              className="deal-start-time"
              type="datetime-local"
              name="start_time"
              value={deal.start_time}
              onChange={handleChange}
              placeholder="Start Time"
              required
            />
            <p>End Date</p>
            <input
              className="deal-end-time"
              type="datetime-local"
              name="end_time"
              value={deal.end_time}
              onChange={handleChange}
              placeholder="End Time"
              required
            />
          </div>

          <div className="dow-row">
            <p>Day of Week</p>
            <input
              className="deal-dow"
              type="text"
              name="day_of_week"
              value={deal.day_of_week}
              onChange={handleChange}
              placeholder="Day of Week"
              required
            />
          </div>

          <div className="date-row">
            <p>Start Time</p>
            <input
              className="deal-start-date"
              type="datetime-local"
              name="start_date"
              value={deal.start_date}
              onChange={handleChange}
              placeholder="Start Date"
              required
            />
            <p>End Time</p>
            <input
              className="deal-end-date"
              type="datetime-local"
              name="end_date"
              value={deal.end_date}
              onChange={handleChange}
              placeholder="End Date"
              required
            />
          </div>
          <div className="desc-row">
            <p>Description</p>
            <textarea
              className="deal-desc"
              name="description"
              value={deal.description}
              onChange={handleChange}
              placeholder=""
              required
            />
          </div>

          <div className="buttons-row">
            <div className="save-discard-button-container">
            <img
                src={process.env.PUBLIC_URL + '/images/save.svg'}
                alt="searchicon"
                className="save-icon"
              />
              <input className="save-button" type="submit" value="Save" />
              <img
                src={process.env.PUBLIC_URL + '/images/trash3.svg'}
                alt="searchicon"
                className="discard-icon"
              />
              <button
                type="button"
                className="discard-button"
                onClick={handleCancel}
              >
              Discard
            </button>
            </div>

          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default CustomRepeatModal;
